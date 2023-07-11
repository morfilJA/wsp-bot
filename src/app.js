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

app.use(express.json());
app.set("json spaces", 4);
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


//
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
    console.log('Conexion exitosa nenes');
});


//Aquí sucede la magia, escucha los mensajes y aquí es donde se manipula lo que queremos que haga el bot
// Objeto para mantener un registro de las opciones del usuario
const opcionesUsuario = {};

client.on('message', message => {
    // Convertir el texto del mensaje a minúsculas
    const mensajeEnMinusculas = message.body.toLowerCase();
    console.log(mensajeEnMinusculas);

    // Verificar si el usuario eligió una opción
    if (opcionesUsuario[message.from] && !isNaN(mensajeEnMinusculas)) {
        const opcion = opcionesUsuario[message.from][parseInt(mensajeEnMinusculas) - 1];
        if (opcion) {
            client.sendMessage(message.from, opcion.url);
            return;
        }
    }
    
    for (let i = 0; i < respuestas.length; i++) {
        if (mensajeEnMinusculas === respuestas[i].clave.toLowerCase()) {
            let respuesta = respuestas[i].respuesta;
            
            // Si existen opciones, añádelas a la respuesta y al registro de opciones del usuario
            if (respuestas[i].opciones) {
                respuesta += '\n';
                for (let j = 0; j < respuestas[i].opciones.length; j++) {
                    respuesta += `${j+1}. ${respuestas[i].opciones[j].texto}\n`;
                }
                opcionesUsuario[message.from] = respuestas[i].opciones;
            }

            client.sendMessage(message.from, respuesta);
            break;
        }
    }
});


client.initialize();
//



module.exports = app;