//==============================================================
//                      SYSTEM APPLICATION
//==============================================================

"use strict";

// IMPORTS
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const respuestas = require('../src/config/msg.json');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

app.use(express.json());
app.set("json spaces", 4);
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));



const qrcode = require('qrcode-terminal');

//Crea una sesión con whatsapp-web y la guarda localmente para autenticarse solo una vez por QR
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
});

//Genera el código qr para conectarse a whatsapp-web
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

//Si la conexión es exitosa muestra el mensaje de conexión exitosa
client.on('ready', () => {
    console.log('Conexion exitosa!!!');
});


//Aquí sucede la magia, escucha los mensajes y aquí es donde se manipula lo que queremos que haga el bot
// Objeto para mantener un registro de las opciones del usuario
const opcionesUsuario = {};

client.on('message', message => {
  // Verificar si el mensaje proviene de un grupo
  if (message.isGroupMsg) {
    // Convertir el texto del mensaje a minúsculas
    const mensajeEnMinusculas = message.body.toLowerCase();
    console.log(mensajeEnMinusculas);

    // Tokenizar el mensaje en palabras individuales
    const palabrasMensaje = tokenizer.tokenize(mensajeEnMinusculas);

    for (let i = 0; i < respuestas.length; i++) {
      const claveRespuesta = respuestas[i].clave.toLowerCase();

      // Verificar si alguna palabra clave coincide con alguna palabra del mensaje
      const coincidencia = palabrasMensaje.some(palabra => claveRespuesta.includes(palabra));

      if (coincidencia) {
        let respuesta = respuestas[i].respuesta;

        // Si existen opciones, añádelas a la respuesta y al registro de opciones del usuario
        if (respuestas[i].opciones) {
          respuesta += '\n';
          for (let j = 0; j < respuestas[i].opciones.length; j++) {
            respuesta += `${j + 1}. ${respuestas[i].opciones[j].texto}\n`;
          }
          opcionesUsuario[message.from] = respuestas[i].opciones;
        }

        // Envío de respuesta después de un retraso de 3 segundos
        setTimeout(() => {
          client.sendMessage(message.from, respuesta);
        }, 3000);
        break;
      }
    }
  }
});
  


client.initialize();




module.exports = app;