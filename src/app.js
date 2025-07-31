// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const app = express();
// const respuestas = require('../src/config/msg.json');
// const natural = require('natural');
// const tokenizer = new natural.WordTokenizer();

// app.use(express.json());
// app.set("json spaces", 4);
// const corsOptions = {
//     origin: "*",
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// const qrcode = require('qrcode-terminal');

// //Crea una sesión con whatsapp-web y la guarda localmente para autenticarse solo una vez por QR
// const { Client, LocalAuth } = require('whatsapp-web.js');
// const client = new Client({
//     authStrategy: new LocalAuth()
// });

// //Genera el código qr para conectarse a whatsapp-web
// client.on('qr', qr => {
//     qrcode.generate(qr, {small: true});
// });

// //Si la conexión es exitosa muestra el mensaje de conexión exitosa
// client.on('ready', () => {
//     console.log('Conexion exitosa!!!');
// });

// //Aquí sucede la magia, escucha los mensajes y aquí es donde se manipula lo que queremos que haga el bot
// // Objeto para mantener un registro de las opciones del usuario
// const opcionesUsuario = {};

// client.on('message', message => {
//   // Verificar si el mensaje proviene de un grupo
//   if (message.isGroupMsg) {
//     // Convertir el texto del mensaje a minúsculas
//     const mensajeEnMinusculas = message.body.toLowerCase();
//     console.log(mensajeEnMinusculas);

//     // Tokenizar el mensaje en palabras individuales
//     const palabrasMensaje = tokenizer.tokenize(mensajeEnMinusculas);

//     for (let i = 0; i < respuestas.length; i++) {
//       const claveRespuesta = respuestas[i].clave.toLowerCase();

//       // Verificar si alguna palabra clave coincide con alguna palabra del mensaje
//       const coincidencia = palabrasMensaje.some(palabra => claveRespuesta.includes(palabra));

//       if (coincidencia) {
//         let respuesta = respuestas[i].respuesta;

//         // Si existen opciones, añádelas a la respuesta y al registro de opciones del usuario
//         if (respuestas[i].opciones) {
//           respuesta += '\n';
//           for (let j = 0; j < respuestas[i].opciones.length; j++) {
//             respuesta += `${j + 1}. ${respuestas[i].opciones[j].texto}\n`;
//           }
//           opcionesUsuario[message.from] = respuestas[i].opciones;
//         }

//         // Envío de respuesta después de un retraso de 3 segundos
//         setTimeout(() => {
//           client.sendMessage(message.from, respuesta);
//         }, 3000);
//         break;
//       }
//     }
//   }
// });

// client.initialize();

// module.exports = app;

//----------------------------------------------------------------- solo grupos

// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const app = express();
// const respuestas = require('../src/config/msg.json');
// const natural = require('natural');
// const tokenizer = new natural.WordTokenizer();

// app.use(express.json());
// app.set("json spaces", 4);
// const corsOptions = {
//     origin: "*",
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// const qrcode = require('qrcode-terminal');

// //Crea una sesión con whatsapp-web y la guarda localmente para autenticarse solo una vez por QR
// const { Client, LocalAuth } = require('whatsapp-web.js');
// const client = new Client({
//     authStrategy: new LocalAuth({
//         dataPath: './wwebjs_auth'
//     }),
//     puppeteer: {
//         headless: true,
//         args: [
//             '--no-sandbox',
//             '--disable-setuid-sandbox',
//             '--disable-dev-shm-usage',
//             '--disable-accelerated-2d-canvas',
//             '--no-first-run',
//             '--no-zygote',
//             '--single-process',
//             '--disable-gpu'
//         ]
//     }
// });

// //Genera el código qr para conectarse a whatsapp-web
// client.on('qr', qr => {
//     console.log('\n' + '='.repeat(50));
//     console.log('🚀 ESCANEA ESTE CÓDIGO QR CON TU TELÉFONO:');
//     console.log('='.repeat(50));
//     qrcode.generate(qr, {small: true});
//     console.log('='.repeat(50));
//     console.log('📱 Abre WhatsApp > Dispositivos vinculados > Vincular dispositivo');
//     console.log('⏳ Una vez escaneado, verás "Conexión exitosa" aquí');
//     console.log('='.repeat(50) + '\n');
// });

// //Si la conexión es exitosa muestra el mensaje de conexión exitosa
// client.on('ready', () => {
//     console.log('\n' + '🎉'.repeat(20));
//     console.log('✅ ¡CONEXIÓN EXITOSA CON WHATSAPP!');
//     console.log('🤖 El bot está listo para recibir mensajes');
//     console.log('🎉'.repeat(20) + '\n');
// });

// // Manejo de errores adicionales
// client.on('auth_failure', msg => {
//     console.error('❌ Error de autenticación:', msg);
//     console.log('💡 Intenta eliminar la carpeta .wwebjs_auth y volver a escanear el QR');
// });

// client.on('disconnected', (reason) => {
//     console.log('⚠️ Cliente desconectado:', reason);
//     console.log('🔄 Intentando reconectar...');
// });

// //Aquí sucede la magia, escucha los mensajes y aquí es donde se manipula lo que queremos que haga el bot
// // Objeto para mantener un registro de las opciones del usuario
// const opcionesUsuario = {};

// client.on('message', message => {
//   // Verificar si el mensaje proviene de un grupo
//   if (message.isGroupMsg) {
//     // Convertir el texto del mensaje a minúsculas
//     const mensajeEnMinusculas = message.body.toLowerCase();
//     console.log('📨 Mensaje recibido:', mensajeEnMinusculas);

//     // Tokenizar el mensaje en palabras individuales
//     const palabrasMensaje = tokenizer.tokenize(mensajeEnMinusculas);

//     for (let i = 0; i < respuestas.length; i++) {
//       const claveRespuesta = respuestas[i].clave.toLowerCase();

//       // Verificar si alguna palabra clave coincide con alguna palabra del mensaje
//       const coincidencia = palabrasMensaje.some(palabra => claveRespuesta.includes(palabra));

//       if (coincidencia) {
//         let respuesta = respuestas[i].respuesta;

//         // Si existen opciones, añádelas a la respuesta y al registro de opciones del usuario
//         if (respuestas[i].opciones) {
//           respuesta += '\n';
//           for (let j = 0; j < respuestas[i].opciones.length; j++) {
//             respuesta += `${j + 1}. ${respuestas[i].opciones[j].texto}\n`;
//           }
//           opcionesUsuario[message.from] = respuestas[i].opciones;
//         }

//         console.log('🤖 Enviando respuesta:', respuesta.substring(0, 50) + '...');

//         // Envío de respuesta después de un retraso de 3 segundos
//         setTimeout(() => {
//           client.sendMessage(message.from, respuesta)
//             .then(() => {
//               console.log('✅ Mensaje enviado correctamente');
//             })
//             .catch(err => {
//               console.error('❌ Error al enviar mensaje:', err);
//             });
//         }, 3000);
//         break;
//       }
//     }
//   }
// });

// // Inicializar el cliente con manejo de errores
// client.initialize()
//   .then(() => {
//     console.log('🔄 Cliente inicializado, esperando conexión...');
//   })
//   .catch(err => {
//     console.error('❌ Error al inicializar cliente:', err);
//   });

// module.exports = app;

//-------------------- grupos e individual
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const app = express();
// const respuestas = require('../src/config/msg.json');
// const natural = require('natural');
// const tokenizer = new natural.WordTokenizer();

// app.use(express.json());
// app.set("json spaces", 4);
// const corsOptions = {
//     origin: "*",
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// const qrcode = require('qrcode-terminal');

// //Crea una sesión con whatsapp-web y la guarda localmente para autenticarse solo una vez por QR
// const { Client, LocalAuth } = require('whatsapp-web.js');
// const client = new Client({
//     authStrategy: new LocalAuth({
//         dataPath: './wwebjs_auth'
//     }),
//     puppeteer: {
//         headless: true,
//         args: [
//             '--no-sandbox',
//             '--disable-setuid-sandbox',
//             '--disable-dev-shm-usage',
//             '--disable-accelerated-2d-canvas',
//             '--no-first-run',
//             '--no-zygote',
//             '--single-process',
//             '--disable-gpu'
//         ]
//     }
// });

// //Genera el código qr para conectarse a whatsapp-web
// client.on('qr', qr => {
//     console.log('\n' + '='.repeat(50));
//     console.log('🚀 ESCANEA ESTE CÓDIGO QR CON TU TELÉFONO:');
//     console.log('='.repeat(50));
//     qrcode.generate(qr, {small: true});
//     console.log('='.repeat(50));
//     console.log('📱 Abre WhatsApp > Dispositivos vinculados > Vincular dispositivo');
//     console.log('⏳ Una vez escaneado, verás "Conexión exitosa" aquí');
//     console.log('='.repeat(50) + '\n');
// });

// //Si la conexión es exitosa muestra el mensaje de conexión exitosa
// client.on('ready', () => {
//     console.log('\n' + '🎉'.repeat(20));
//     console.log('✅ ¡CONEXIÓN EXITOSA CON WHATSAPP!');
//     console.log('🤖 El bot está listo para recibir mensajes');
//     console.log('🎉'.repeat(20) + '\n');
// });

// // Manejo de errores adicionales
// client.on('auth_failure', msg => {
//     console.error('❌ Error de autenticación:', msg);
//     console.log('💡 Intenta eliminar la carpeta .wwebjs_auth y volver a escanear el QR');
// });

// client.on('disconnected', (reason) => {
//     console.log('⚠️ Cliente desconectado:', reason);
//     console.log('🔄 Intentando reconectar...');
// });

// // Objeto para mantener un registro de las opciones del usuario
// const opcionesUsuario = {};

// client.on('message', message => {
//     // DEBUG: Mostrar información del mensaje
//     console.log('\n' + '🔍'.repeat(30));
//     console.log('📩 MENSAJE RECIBIDO:');
//     console.log('💬 Contenido:', message.body);
//     console.log('👤 De:', message.from);
//     console.log('📍 Es grupo:', message.isGroupMsg);
//     console.log('🤖 Es del bot:', message.fromMe);
//     console.log('🔍'.repeat(30));

//     // Ignorar mensajes enviados por el bot mismo
//     if (message.fromMe) {
//         console.log('⏭️ Ignorando mensaje propio del bot');
//         return;
//     }

//     // CAMBIO: Responder tanto en grupos como en chats individuales
//     // Cambia esta línea si solo quieres grupos: if (message.isGroupMsg) {
//     if (message.body && message.body.trim() !== '') {
//         // Convertir el texto del mensaje a minúsculas
//         const mensajeEnMinusculas = message.body.toLowerCase().trim();
//         console.log('🔤 Mensaje procesado:', mensajeEnMinusculas);

//         // Tokenizar el mensaje en palabras individuales
//         const palabrasMensaje = tokenizer.tokenize(mensajeEnMinusculas);
//         console.log('🔤 Palabras encontradas:', palabrasMensaje);

//         let respuestaEncontrada = false;

//         for (let i = 0; i < respuestas.length; i++) {
//             const claveRespuesta = respuestas[i].clave.toLowerCase();
//             console.log(`🔍 Comparando con clave: "${claveRespuesta}"`);

//             // Verificar si alguna palabra clave coincide con alguna palabra del mensaje
//             const coincidencia = palabrasMensaje.some(palabra => claveRespuesta.includes(palabra));
            
//             if (coincidencia) {
//                 console.log(`✅ ¡COINCIDENCIA ENCONTRADA con: "${claveRespuesta}"!`);
//                 let respuesta = respuestas[i].respuesta;

//                 // Si existen opciones, añádelas a la respuesta y al registro de opciones del usuario
//                 if (respuestas[i].opciones) {
//                     respuesta += '\n';
//                     for (let j = 0; j < respuestas[i].opciones.length; j++) {
//                         respuesta += `${j + 1}. ${respuestas[i].opciones[j].texto}\n`;
//                     }
//                     opcionesUsuario[message.from] = respuestas[i].opciones;
//                 }

//                 console.log('🤖 Preparando respuesta:', respuesta);

//                 // Envío de respuesta después de un retraso de 3 segundos
//                 setTimeout(() => {
//                     client.sendMessage(message.from, respuesta)
//                         .then(() => {
//                             console.log('✅ ¡Mensaje enviado correctamente!');
//                         })
//                         .catch(err => {
//                             console.error('❌ Error al enviar mensaje:', err);
//                         });
//                 }, 3000);
                
//                 respuestaEncontrada = true;
//                 break;
//             }
//         }

//         if (!respuestaEncontrada) {
//             console.log('❌ No se encontró ninguna coincidencia para el mensaje');
//         }
//     }
// });

// // Inicializar el cliente con manejo de errores
// client.initialize()
//     .then(() => {
//         console.log('🔄 Cliente inicializado, esperando conexión...');
//     })
//     .catch(err => {
//         console.error('❌ Error al inicializar cliente:', err);
//     });

// module.exports = app;

//---------------------solo mi numero
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
    authStrategy: new LocalAuth({
        dataPath: './wwebjs_auth'
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

//Genera el código qr para conectarse a whatsapp-web
client.on('qr', qr => {
    console.log('\n' + '='.repeat(50));
    console.log('🚀 ESCANEA ESTE CÓDIGO QR CON TU TELÉFONO:');
    console.log('='.repeat(50));
    qrcode.generate(qr, {small: true});
    console.log('='.repeat(50));
    console.log('📱 Abre WhatsApp > Dispositivos vinculados > Vincular dispositivo');
    console.log('⏳ Una vez escaneado, verás "Conexión exitosa" aquí');
    console.log('='.repeat(50) + '\n');
});

//Si la conexión es exitosa muestra el mensaje de conexión exitosa
client.on('ready', () => {
    console.log('\n' + '🎉'.repeat(20));
    console.log('✅ ¡CONEXIÓN EXITOSA CON WHATSAPP!');
    console.log('🤖 El bot está listo para recibir mensajes');
    console.log('🎉'.repeat(20) + '\n');
});

// Manejo de errores adicionales
client.on('auth_failure', msg => {
    console.error('❌ Error de autenticación:', msg);
    console.log('💡 Intenta eliminar la carpeta .wwebjs_auth y volver a escanear el QR');
});

client.on('disconnected', (reason) => {
    console.log('⚠️ Cliente desconectado:', reason);
    console.log('🔄 Intentando reconectar...');
});

// Objeto para mantener un registro de las opciones del usuario
const opcionesUsuario = {};

client.on('message', message => {
    // DEBUG: Mostrar información del mensaje
    console.log('\n' + '🔍'.repeat(30));
    console.log('📩 MENSAJE RECIBIDO:');
    console.log('💬 Contenido:', message.body);
    console.log('👤 De:', message.from);
    console.log('📍 Es grupo:', message.isGroupMsg);
    console.log('🤖 Es del bot:', message.fromMe);
    console.log('🔍'.repeat(30));

    // Ignorar mensajes enviados por el bot mismo
    if (message.fromMe) {
        console.log('⏭️ Ignorando mensaje propio del bot');
        return;
    }

    // SOLO responder a mensajes DIRECTOS (NO grupos)
    if (!message.isGroupMsg && message.body && message.body.trim() !== '') {
        console.log('💬 Procesando mensaje directo (no es grupo)');
        
        // Convertir el texto del mensaje a minúsculas
        const mensajeEnMinusculas = message.body.toLowerCase().trim();
        console.log('🔤 Mensaje procesado:', mensajeEnMinusculas);

        // Tokenizar el mensaje en palabras individuales
        const palabrasMensaje = tokenizer.tokenize(mensajeEnMinusculas);
        console.log('🔤 Palabras encontradas:', palabrasMensaje);

        let respuestaEncontrada = false;

        for (let i = 0; i < respuestas.length; i++) {
            const claveRespuesta = respuestas[i].clave.toLowerCase();
            console.log(`🔍 Comparando con clave: "${claveRespuesta}"`);

            // Verificar si alguna palabra clave coincide con alguna palabra del mensaje
            const coincidencia = palabrasMensaje.some(palabra => claveRespuesta.includes(palabra));
            
            if (coincidencia) {
                console.log(`✅ ¡COINCIDENCIA ENCONTRADA con: "${claveRespuesta}"!`);
                let respuesta = respuestas[i].respuesta;

                // Si existen opciones, añádelas a la respuesta y al registro de opciones del usuario
                if (respuestas[i].opciones) {
                    respuesta += '\n';
                    for (let j = 0; j < respuestas[i].opciones.length; j++) {
                        respuesta += `${j + 1}. ${respuestas[i].opciones[j].texto}\n`;
                    }
                    opcionesUsuario[message.from] = respuestas[i].opciones;
                }

                console.log('🤖 Preparando respuesta:', respuesta);

                // Envío de respuesta después de un retraso de 3 segundos
                setTimeout(() => {
                    client.sendMessage(message.from, respuesta)
                        .then(() => {
                            console.log('✅ ¡Mensaje enviado correctamente!');
                        })
                        .catch(err => {
                            console.error('❌ Error al enviar mensaje:', err);
                        });
                }, 3000);
                
                respuestaEncontrada = true;
                break;
            }
        }

        if (!respuestaEncontrada) {
            console.log('❌ No se encontró ninguna coincidencia para el mensaje');
        }
    } else if (message.isGroupMsg) {
        console.log('⏭️ Ignorando mensaje de grupo');
    }
});

// Inicializar el cliente con manejo de errores
client.initialize()
    .then(() => {
        console.log('🔄 Cliente inicializado, esperando conexión...');
    })
    .catch(err => {
        console.error('❌ Error al inicializar cliente:', err);
    });

module.exports = app;

//-----------------modo testing me permite enviarme mensajes yo mismo

// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const app = express();
// const respuestas = require('../src/config/msg.json');
// const natural = require('natural');
// const tokenizer = new natural.WordTokenizer();

// app.use(express.json());
// app.set("json spaces", 4);
// const corsOptions = {
//     origin: "*",
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// const qrcode = require('qrcode-terminal');

// //Crea una sesión con whatsapp-web y la guarda localmente para autenticarse solo una vez por QR
// const { Client, LocalAuth } = require('whatsapp-web.js');
// const client = new Client({
//     authStrategy: new LocalAuth({
//         dataPath: './wwebjs_auth'
//     }),
//     puppeteer: {
//         headless: true,
//         args: [
//             '--no-sandbox',
//             '--disable-setuid-sandbox',
//             '--disable-dev-shm-usage',
//             '--disable-accelerated-2d-canvas',
//             '--no-first-run',
//             '--no-zygote',
//             '--single-process',
//             '--disable-gpu'
//         ]
//     }
// });

// //Genera el código qr para conectarse a whatsapp-web
// client.on('qr', qr => {
//     console.log('\n' + '='.repeat(50));
//     console.log('🚀 ESCANEA ESTE CÓDIGO QR CON TU TELÉFONO:');
//     console.log('='.repeat(50));
//     qrcode.generate(qr, {small: true});
//     console.log('='.repeat(50));
//     console.log('📱 Abre WhatsApp > Dispositivos vinculados > Vincular dispositivo');
//     console.log('⏳ Una vez escaneado, verás "Conexión exitosa" aquí');
//     console.log('='.repeat(50) + '\n');
// });

// //Si la conexión es exitosa muestra el mensaje de conexión exitosa
// client.on('ready', () => {
//     console.log('\n' + '🎉'.repeat(20));
//     console.log('✅ ¡CONEXIÓN EXITOSA CON WHATSAPP!');
//     console.log('🤖 El bot está listo para recibir mensajes');
//     console.log('🎉'.repeat(20) + '\n');
// });

// // Manejo de errores adicionales
// client.on('auth_failure', msg => {
//     console.error('❌ Error de autenticación:', msg);
//     console.log('💡 Intenta eliminar la carpeta .wwebjs_auth y volver a escanear el QR');
// });

// client.on('disconnected', (reason) => {
//     console.log('⚠️ Cliente desconectado:', reason);
//     console.log('🔄 Intentando reconectar...');
// });

// // Objeto para mantener un registro de las opciones del usuario
// const opcionesUsuario = {};

// client.on('message', message => {
//     // DEBUG: Mostrar información del mensaje
//     console.log('\n' + '🔍'.repeat(30));
//     console.log('📩 MENSAJE RECIBIDO:');
//     console.log('💬 Contenido:', message.body);
//     console.log('👤 De:', message.from);
//     console.log('📍 Es grupo:', message.isGroupMsg);
//     console.log('🤖 Es del bot:', message.fromMe);
//     console.log('🔍'.repeat(30));

//     // ⚠️ COMENTADO PARA TESTING - Ignorar mensajes enviados por el bot mismo
//     // IMPORTANTE: Descomenta esto cuando termines las pruebas para evitar loops infinitos
//     // if (message.fromMe) {
//     //     console.log('⏭️ Ignorando mensaje propio del bot');
//     //     return;
//     // }

//     // SOLO responder a mensajes DIRECTOS (NO grupos)
//     if (!message.isGroupMsg && message.body && message.body.trim() !== '') {
//         console.log('💬 Procesando mensaje directo (no es grupo)');
        
//         // Convertir el texto del mensaje a minúsculas
//         const mensajeEnMinusculas = message.body.toLowerCase().trim();
//         console.log('🔤 Mensaje procesado:', mensajeEnMinusculas);

//         // Tokenizar el mensaje en palabras individuales
//         const palabrasMensaje = tokenizer.tokenize(mensajeEnMinusculas);
//         console.log('🔤 Palabras encontradas:', palabrasMensaje);

//         let respuestaEncontrada = false;

//         for (let i = 0; i < respuestas.length; i++) {
//             const claveRespuesta = respuestas[i].clave.toLowerCase();
//             console.log(`🔍 Comparando con clave: "${claveRespuesta}"`);

//             // Verificar si alguna palabra clave coincide con alguna palabra del mensaje
//             const coincidencia = palabrasMensaje.some(palabra => claveRespuesta.includes(palabra));
            
//             if (coincidencia) {
//                 console.log(`✅ ¡COINCIDENCIA ENCONTRADA con: "${claveRespuesta}"!`);
//                 let respuesta = respuestas[i].respuesta;

//                 // Si existen opciones, añádelas a la respuesta y al registro de opciones del usuario
//                 if (respuestas[i].opciones) {
//                     respuesta += '\n';
//                     for (let j = 0; j < respuestas[i].opciones.length; j++) {
//                         respuesta += `${j + 1}. ${respuestas[i].opciones[j].texto}\n`;
//                     }
//                     opcionesUsuario[message.from] = respuestas[i].opciones;
//                 }

//                 console.log('🤖 Preparando respuesta:', respuesta);

//                 // Envío de respuesta después de un retraso de 3 segundos
//                 setTimeout(() => {
//                     client.sendMessage(message.from, respuesta)
//                         .then(() => {
//                             console.log('✅ ¡Mensaje enviado correctamente!');
//                         })
//                         .catch(err => {
//                             console.error('❌ Error al enviar mensaje:', err);
//                         });
//                 }, 3000);
                
//                 respuestaEncontrada = true;
//                 break;
//             }
//         }

//         if (!respuestaEncontrada) {
//             console.log('❌ No se encontró ninguna coincidencia para el mensaje');
//         }
//     } else if (message.isGroupMsg) {
//         console.log('⏭️ Ignorando mensaje de grupo');
//     }
// });

// // Inicializar el cliente con manejo de errores
// client.initialize()
//     .then(() => {
//         console.log('🔄 Cliente inicializado, esperando conexión...');
//     })
//     .catch(err => {
//         console.error('❌ Error al inicializar cliente:', err);
//     });

// module.exports = app;

// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const app = express();
// const respuestas = require('../src/config/msg.json');
// const natural = require('natural');
// const tokenizer = new natural.WordTokenizer();

// app.use(express.json());
// app.set("json spaces", 4);
// const corsOptions = {
//     origin: "*",
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// const qrcode = require('qrcode-terminal');

// //Crea una sesión con whatsapp-web y la guarda localmente para autenticarse solo una vez por QR
// const { Client, LocalAuth } = require('whatsapp-web.js');
// const client = new Client({
//     authStrategy: new LocalAuth({
//         dataPath: './wwebjs_auth'
//     }),
//     puppeteer: {
//         headless: true,
//         args: [
//             '--no-sandbox',
//             '--disable-setuid-sandbox',
//             '--disable-dev-shm-usage',
//             '--disable-accelerated-2d-canvas',
//             '--no-first-run',
//             '--no-zygote',
//             '--single-process',
//             '--disable-gpu'
//         ]
//     }
// });

// //Genera el código qr para conectarse a whatsapp-web
// client.on('qr', qr => {
//     console.log('\n' + '='.repeat(50));
//     console.log('🚀 ESCANEA ESTE CÓDIGO QR CON TU TELÉFONO:');
//     console.log('='.repeat(50));
//     qrcode.generate(qr, {small: true});
//     console.log('='.repeat(50));
//     console.log('📱 Abre WhatsApp > Dispositivos vinculados > Vincular dispositivo');
//     console.log('⏳ Una vez escaneado, verás "Conexión exitosa" aquí');
//     console.log('='.repeat(50) + '\n');
// });

// //Si la conexión es exitosa muestra el mensaje de conexión exitosa
// client.on('ready', () => {
//     console.log('\n' + '🎉'.repeat(20));
//     console.log('✅ ¡CONEXIÓN EXITOSA CON WHATSAPP!');
//     console.log('🤖 El bot está listo para recibir mensajes');
//     console.log('🎉'.repeat(20) + '\n');
// });

// // Manejo de errores adicionales
// client.on('auth_failure', msg => {
//     console.error('❌ Error de autenticación:', msg);
//     console.log('💡 Intenta eliminar la carpeta .wwebjs_auth y volver a escanear el QR');
// });

// client.on('disconnected', (reason) => {
//     console.log('⚠️ Cliente desconectado:', reason);
//     console.log('🔄 Intentando reconectar...');
// });

// // Objeto para mantener un registro de las opciones del usuario
// const opcionesUsuario = {};

// // Escuchar TODOS los mensajes (incluso los propios)
// client.on('message_create', message => {
//     // DEBUG BÁSICO: Verificar si llegan mensajes
//     console.log('\n🚨 ¡MENSAJE DETECTADO CON message_create! 🚨');
    
//     // DEBUG: Mostrar información del mensaje
//     console.log('\n' + '🔍'.repeat(30));
//     console.log('📩 MENSAJE RECIBIDO:');
//     console.log('💬 Contenido:', message.body);
//     console.log('👤 De:', message.from);
//     console.log('📍 Es grupo:', message.isGroupMsg);
//     console.log('🤖 Es del bot:', message.fromMe);
//     console.log('🔍'.repeat(30));

//     // ⚠️ COMENTADO PARA TESTING - Ignorar mensajes enviados por el bot mismo
//     // IMPORTANTE: Descomenta esto cuando termines las pruebas para evitar loops infinitos
//     // if (message.fromMe) {
//     //     console.log('⏭️ Ignorando mensaje propio del bot');
//     //     return;
//     // }

//     // SOLO responder a mensajes DIRECTOS (NO grupos)
//     if (!message.isGroupMsg && message.body && message.body.trim() !== '') {
//         console.log('💬 Procesando mensaje directo (no es grupo)');
        
//         // Convertir el texto del mensaje a minúsculas
//         const mensajeEnMinusculas = message.body.toLowerCase().trim();
//         console.log('🔤 Mensaje procesado:', mensajeEnMinusculas);

//         // Tokenizar el mensaje en palabras individuales
//         const palabrasMensaje = tokenizer.tokenize(mensajeEnMinusculas);
//         console.log('🔤 Palabras encontradas:', palabrasMensaje);

//         let respuestaEncontrada = false;

//         for (let i = 0; i < respuestas.length; i++) {
//             const claveRespuesta = respuestas[i].clave.toLowerCase();
//             console.log(`🔍 Comparando con clave: "${claveRespuesta}"`);

//             // Verificar si alguna palabra clave coincide con alguna palabra del mensaje
//             const coincidencia = palabrasMensaje.some(palabra => claveRespuesta.includes(palabra));
            
//             if (coincidencia) {
//                 console.log(`✅ ¡COINCIDENCIA ENCONTRADA con: "${claveRespuesta}"!`);
//                 let respuesta = respuestas[i].respuesta;

//                 // Si existen opciones, añádelas a la respuesta y al registro de opciones del usuario
//                 if (respuestas[i].opciones) {
//                     respuesta += '\n';
//                     for (let j = 0; j < respuestas[i].opciones.length; j++) {
//                         respuesta += `${j + 1}. ${respuestas[i].opciones[j].texto}\n`;
//                     }
//                     opcionesUsuario[message.from] = respuestas[i].opciones;
//                 }

//                 console.log('🤖 Preparando respuesta:', respuesta);

//                 // Envío de respuesta después de un retraso de 3 segundos
//                 setTimeout(() => {
//                     client.sendMessage(message.from, respuesta)
//                         .then(() => {
//                             console.log('✅ ¡Mensaje enviado correctamente!');
//                         })
//                         .catch(err => {
//                             console.error('❌ Error al enviar mensaje:', err);
//                         });
//                 }, 3000);
                
//                 respuestaEncontrada = true;
//                 break;
//             }
//         }

//         if (!respuestaEncontrada) {
//             console.log('❌ No se encontró ninguna coincidencia para el mensaje');
//         }
//     } else if (message.isGroupMsg) {
//         console.log('⏭️ Ignorando mensaje de grupo');
//     }
// });

// // Inicializar el cliente con manejo de errores
// client.initialize()
//     .then(() => {
//         console.log('🔄 Cliente inicializado, esperando conexión...');
//     })
//     .catch(err => {
//         console.error('❌ Error al inicializar cliente:', err);
//     });

// module.exports = app;