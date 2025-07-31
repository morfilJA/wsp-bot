// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');
// const app = express();

// app.use(express.json());
// app.set("json spaces", 4);
// const corsOptions = {
//     origin: "*",
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// const qrcode = require('qrcode-terminal');

// // Crear carpeta para guardar pedidos si no existe
// const carpetaPedidos = './pedidos_procesados';
// if (!fs.existsSync(carpetaPedidos)) {
//     fs.mkdirSync(carpetaPedidos);
//     console.log('📁 Carpeta de pedidos creada');
// }

// // Función para detectar si es un pedido
// function esPedido(mensaje) {
//     const indicadoresPedido = [
//         '🍽️ NUEVO PEDIDO',
//         'NUEVO PEDIDO',
//         'GastroSoft',
//         'DETALLE DEL PEDIDO',
//         'RESUMEN:',
//         'TOTAL:',
//         'TIPO DE ENTREGA'
//     ];
    
//     return indicadoresPedido.some(indicador => 
//         mensaje.toUpperCase().includes(indicador.toUpperCase())
//     );
// }

// // Función para extraer información del pedido
// function procesarPedido(mensaje, numeroRemitente) {
//     const fechaActual = new Date();
//     const timestamp = fechaActual.toISOString();
    
//     // Extraer información básica
//     const fechaMatch = mensaje.match(/📅 Fecha: ([^\n]+)/);
//     const horaMatch = mensaje.match(/🕐 Hora: ([^\n]+)/);
//     const totalMatch = mensaje.match(/TOTAL: \$?([0-9,]+\.?[0-9]*)/);
//     const tipoEntregaMatch = mensaje.match(/🚚 TIPO DE ENTREGA:\s*([^\n]+)/);
    
//     // Extraer productos (buscar líneas que empiecen con números)
//     const productos = [];
//     const lineas = mensaje.split('\n');
//     let enSeccionProductos = false;
    
//     for (let i = 0; i < lineas.length; i++) {
//         const linea = lineas[i].trim();
        
//         if (linea.includes('DETALLE DEL PEDIDO')) {
//             enSeccionProductos = true;
//             continue;
//         }
        
//         if (linea.includes('RESUMEN:') || linea.includes('💰')) {
//             enSeccionProductos = false;
//             continue;
//         }
        
//         if (enSeccionProductos && /^\d+\./.test(linea)) {
//             // Es un producto (empieza con número y punto)
//             const producto = {
//                 nombre: linea.replace(/^\d+\.\s*/, ''),
//                 cantidad: null,
//                 precio: null,
//                 subtotal: null
//             };
            
//             // Buscar cantidad, precio y subtotal en las siguientes líneas
//             for (let j = i + 1; j < Math.min(i + 4, lineas.length); j++) {
//                 const siguienteLinea = lineas[j].trim();
                
//                 if (siguienteLinea.includes('Cantidad:')) {
//                     producto.cantidad = siguienteLinea.replace('Cantidad:', '').trim();
//                 }
//                 if (siguienteLinea.includes('Precio unitario:')) {
//                     producto.precio = siguienteLinea.replace('Precio unitario:', '').trim();
//                 }
//                 if (siguienteLinea.includes('Subtotal:')) {
//                     producto.subtotal = siguienteLinea.replace('Subtotal:', '').trim();
//                 }
//             }
            
//             productos.push(producto);
//         }
//     }
    
//     const pedidoProcesado = {
//         timestamp: timestamp,
//         fechaRecepcion: fechaActual.toLocaleString('es-AR'),
//         numeroRemitente: numeroRemitente,
//         fechaPedido: fechaMatch ? fechaMatch[1] : 'No encontrada',
//         horaPedido: horaMatch ? horaMatch[1] : 'No encontrada',
//         productos: productos,
//         total: totalMatch ? totalMatch[1] : 'No encontrado',
//         tipoEntrega: tipoEntregaMatch ? tipoEntregaMatch[1] : 'No especificado',
//         mensajeOriginal: mensaje
//     };
    
//     return pedidoProcesado;
// }

// // Función para guardar pedido en archivo
// function guardarPedido(pedido) {
//     const fecha = new Date();
//     const nombreArchivo = `pedido_${fecha.getFullYear()}-${(fecha.getMonth()+1).toString().padStart(2,'0')}-${fecha.getDate().toString().padStart(2,'0')}_${fecha.getHours().toString().padStart(2,'0')}-${fecha.getMinutes().toString().padStart(2,'0')}-${fecha.getSeconds().toString().padStart(2,'0')}.json`;
    
//     const rutaArchivo = path.join(carpetaPedidos, nombreArchivo);
    
//     try {
//         fs.writeFileSync(rutaArchivo, JSON.stringify(pedido, null, 2), 'utf8');
//         console.log(`💾 Pedido guardado en: ${nombreArchivo}`);
//         return true;
//     } catch (error) {
//         console.error('❌ Error al guardar pedido:', error);
//         return false;
//     }
// }

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

// // Genera el código QR
// client.on('qr', qr => {
//     console.log('\n' + '📖'.repeat(25));
//     console.log('📱 LECTOR DE PEDIDOS - ESCANEA QR:');
//     console.log('🔍 Solo lee mensajes, NO responde automáticamente');
//     console.log('📖'.repeat(25));
//     qrcode.generate(qr, {small: true});
//     console.log('📖'.repeat(25) + '\n');
// });

// // Conexión exitosa
// client.on('ready', () => {
//     console.log('\n' + '✅'.repeat(40));
//     console.log('📖 LECTOR DE PEDIDOS CONECTADO');
//     console.log('🔍 Modo: SOLO LECTURA (sin respuestas automáticas)');
//     console.log('💾 Carpeta de guardado:', carpetaPedidos);
//     console.log('✅'.repeat(40) + '\n');
// });

// // Manejo de errores
// client.on('auth_failure', msg => {
//     console.error('❌ Error de autenticación:', msg);
// });

// client.on('disconnected', (reason) => {
//     console.log('⚠️ Cliente desconectado:', reason);
// });

// // SOLO LEER mensajes - NO responder
// client.on('message', message => {
//     // Ignorar mensajes propios
//     if (message.fromMe) {
//         return;
//     }

//     const numeroRemitente = message.from;
//     const contenido = message.body;
    
//     // Log básico de todos los mensajes
//     console.log('\n' + '📩'.repeat(20));
//     console.log('📱 Mensaje recibido de:', numeroRemitente);
//     console.log('🕐 Hora:', new Date().toLocaleString('es-AR'));
    
//     // Verificar si es un pedido
//     if (esPedido(contenido)) {
//         console.log('🍽️ ¡PEDIDO DETECTADO!');
//         console.log('📩'.repeat(20));
        
//         // Procesar el pedido
//         const pedidoProcesado = procesarPedido(contenido, numeroRemitente);
        
//         // Mostrar información del pedido en consola
//         console.log('\n' + '🍽️'.repeat(30));
//         console.log('📋 INFORMACIÓN DEL PEDIDO:');
//         console.log('🕐 Fecha/Hora:', pedidoProcesado.fechaPedido, pedidoProcesado.horaPedido);
//         console.log('👤 Cliente:', numeroRemitente);
//         console.log('💰 Total:', pedidoProcesado.total);
//         console.log('🚚 Entrega:', pedidoProcesado.tipoEntrega);
        
//         console.log('\n🛒 PRODUCTOS:');
//         pedidoProcesado.productos.forEach((producto, index) => {
//             console.log(`${index + 1}. ${producto.nombre}`);
//             if (producto.cantidad) console.log(`   Cantidad: ${producto.cantidad}`);
//             if (producto.precio) console.log(`   Precio: ${producto.precio}`);
//             if (producto.subtotal) console.log(`   Subtotal: ${producto.subtotal}`);
//         });
        
//         console.log('🍽️'.repeat(30) + '\n');
        
//         // Guardar pedido en archivo
//         if (guardarPedido(pedidoProcesado)) {
//             console.log('✅ Pedido procesado y guardado exitosamente');
//         }
        
//     } else {
//         console.log('💬 Mensaje normal (no es pedido)');
//         console.log('📝 Vista previa:', contenido.substring(0, 50) + '...');
//         console.log('📩'.repeat(20));
//     }
// });

// // Inicializar cliente
// client.initialize()
//     .then(() => {
//         console.log('🔄 Lector de pedidos inicializado...');
//     })
//     .catch(err => {
//         console.error('❌ Error al inicializar:', err);
//     });

// module.exports = app;

//-------------------
//-------------------
//-------------------

// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');
// const app = express();

// app.use(express.json());
// app.set("json spaces", 4);
// const corsOptions = {
//     origin: "*",
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// const qrcode = require('qrcode-terminal');

// // Crear carpeta para guardar pedidos si no existe
// const carpetaPedidos = './pedidos_procesados';
// if (!fs.existsSync(carpetaPedidos)) {
//     fs.mkdirSync(carpetaPedidos);
//     console.log('📁 Carpeta de pedidos creada');
// }

// // Función para detectar si es un pedido (SOLO los que empiecen con 🍽️ NUEVO PEDIDO)
// function esPedido(mensaje) {
//     // Verificar que el mensaje empiece específicamente con "🍽️ NUEVO PEDIDO"
//     return mensaje.trim().startsWith('🍽️ NUEVO PEDIDO');
// }

// // Función para extraer información del pedido
// function procesarPedido(mensaje, numeroRemitente) {
//     const fechaActual = new Date();
//     const timestamp = fechaActual.toISOString();
    
//     // Extraer información básica
//     const fechaMatch = mensaje.match(/📅 Fecha: ([^\n]+)/);
//     const horaMatch = mensaje.match(/🕐 Hora: ([^\n]+)/);
//     const totalMatch = mensaje.match(/TOTAL: \$?([0-9,]+\.?[0-9]*)/);
//     const tipoEntregaMatch = mensaje.match(/🚚 TIPO DE ENTREGA:\s*([^\n]+)/);
    
//     // Extraer productos (buscar líneas que empiecen con números)
//     const productos = [];
//     const lineas = mensaje.split('\n');
//     let enSeccionProductos = false;
    
//     for (let i = 0; i < lineas.length; i++) {
//         const linea = lineas[i].trim();
        
//         if (linea.includes('DETALLE DEL PEDIDO')) {
//             enSeccionProductos = true;
//             continue;
//         }
        
//         if (linea.includes('RESUMEN:') || linea.includes('💰')) {
//             enSeccionProductos = false;
//             continue;
//         }
        
//         if (enSeccionProductos && /^\d+\./.test(linea)) {
//             // Es un producto (empieza con número y punto)
//             const producto = {
//                 nombre: linea.replace(/^\d+\.\s*/, ''),
//                 cantidad: null,
//                 precio: null,
//                 subtotal: null
//             };
            
//             // Buscar cantidad, precio y subtotal en las siguientes líneas
//             for (let j = i + 1; j < Math.min(i + 4, lineas.length); j++) {
//                 const siguienteLinea = lineas[j].trim();
                
//                 if (siguienteLinea.includes('Cantidad:')) {
//                     producto.cantidad = siguienteLinea.replace('Cantidad:', '').trim();
//                 }
//                 if (siguienteLinea.includes('Precio unitario:')) {
//                     producto.precio = siguienteLinea.replace('Precio unitario:', '').trim();
//                 }
//                 if (siguienteLinea.includes('Subtotal:')) {
//                     producto.subtotal = siguienteLinea.replace('Subtotal:', '').trim();
//                 }
//             }
            
//             productos.push(producto);
//         }
//     }
    
//     const pedidoProcesado = {
//         timestamp: timestamp,
//         fechaRecepcion: fechaActual.toLocaleString('es-AR'),
//         numeroRemitente: numeroRemitente,
//         fechaPedido: fechaMatch ? fechaMatch[1] : 'No encontrada',
//         horaPedido: horaMatch ? horaMatch[1] : 'No encontrada',
//         productos: productos,
//         total: totalMatch ? totalMatch[1] : 'No encontrado',
//         tipoEntrega: tipoEntregaMatch ? tipoEntregaMatch[1] : 'No especificado',
//         mensajeOriginal: mensaje
//     };
    
//     return pedidoProcesado;
// }

// // Función para guardar pedido en archivo
// function guardarPedido(pedido) {
//     const fecha = new Date();
//     const nombreArchivo = `pedido_${fecha.getFullYear()}-${(fecha.getMonth()+1).toString().padStart(2,'0')}-${fecha.getDate().toString().padStart(2,'0')}_${fecha.getHours().toString().padStart(2,'0')}-${fecha.getMinutes().toString().padStart(2,'0')}-${fecha.getSeconds().toString().padStart(2,'0')}.json`;
    
//     const rutaArchivo = path.join(carpetaPedidos, nombreArchivo);
    
//     try {
//         fs.writeFileSync(rutaArchivo, JSON.stringify(pedido, null, 2), 'utf8');
//         console.log(`💾 Pedido guardado en: ${nombreArchivo}`);
//         return true;
//     } catch (error) {
//         console.error('❌ Error al guardar pedido:', error);
//         return false;
//     }
// }

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

// // Genera el código QR
// client.on('qr', qr => {
//     console.log('\n' + '📖'.repeat(25));
//     console.log('📱 LECTOR DE PEDIDOS - ESCANEA QR:');
//     console.log('🔍 Solo lee mensajes, NO responde automáticamente');
//     console.log('📖'.repeat(25));
//     qrcode.generate(qr, {small: true});
//     console.log('📖'.repeat(25) + '\n');
// });

// // Conexión exitosa
// client.on('ready', () => {
//     console.log('\n' + '✅'.repeat(40));
//     console.log('📖 LECTOR DE PEDIDOS CONECTADO');
//     console.log('🔍 Modo: SOLO LECTURA (sin respuestas automáticas)');
//     console.log('💾 Carpeta de guardado:', carpetaPedidos);
//     console.log('✅'.repeat(40) + '\n');
// });

// // Manejo de errores
// client.on('auth_failure', msg => {
//     console.error('❌ Error de autenticación:', msg);
// });

// client.on('disconnected', (reason) => {
//     console.log('⚠️ Cliente desconectado:', reason);
// });

// // SOLO LEER mensajes que empiecen con 🍽️ NUEVO PEDIDO
// client.on('message', message => {
//     // Ignorar mensajes propios
//     if (message.fromMe) {
//         return;
//     }

//     const numeroRemitente = message.from;
//     const contenido = message.body;
    
//     // SOLO procesar mensajes que empiecen con 🍽️ NUEVO PEDIDO
//     if (esPedido(contenido)) {
//         // Log del pedido detectado
//         console.log('\n' + '📩'.repeat(20));
//         console.log('📱 Mensaje recibido de:', numeroRemitente);
//         console.log('🕐 Hora:', new Date().toLocaleString('es-AR'));
//         console.log('🍽️ ¡PEDIDO DETECTADO!');
//         console.log('📩'.repeat(20));
        
//         // Procesar el pedido
//         const pedidoProcesado = procesarPedido(contenido, numeroRemitente);
        
//         // Mostrar información del pedido en consola
//         console.log('\n' + '🍽️'.repeat(30));
//         console.log('📋 INFORMACIÓN DEL PEDIDO:');
//         console.log('🕐 Fecha/Hora:', pedidoProcesado.fechaPedido, pedidoProcesado.horaPedido);
//         console.log('👤 Cliente:', numeroRemitente);
//         console.log('💰 Total:', pedidoProcesado.total);
//         console.log('🚚 Entrega:', pedidoProcesado.tipoEntrega);
        
//         console.log('\n🛒 PRODUCTOS:');
//         pedidoProcesado.productos.forEach((producto, index) => {
//             console.log(`${index + 1}. ${producto.nombre}`);
//             if (producto.cantidad) console.log(`   Cantidad: ${producto.cantidad}`);
//             if (producto.precio) console.log(`   Precio: ${producto.precio}`);
//             if (producto.subtotal) console.log(`   Subtotal: ${producto.subtotal}`);
//         });
        
//         console.log('🍽️'.repeat(30) + '\n');
        
//         // Guardar pedido en archivo
//         if (guardarPedido(pedidoProcesado)) {
//             console.log('✅ Pedido procesado y guardado exitosamente');
//         }
//     }
//     // ELIMINADO: No mostrar nada para mensajes que no sean pedidos
// });

// // Inicializar cliente
// client.initialize()
//     .then(() => {
//         console.log('🔄 Lector de pedidos inicializado...');
//     })
//     .catch(err => {
//         console.error('❌ Error al inicializar:', err);
//     });

// module.exports = app;

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.set("json spaces", 4);
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const qrcode = require('qrcode-terminal');

// Crear carpeta para guardar pedidos si no existe
const carpetaPedidos = './pedidos_procesados';
if (!fs.existsSync(carpetaPedidos)) {
    fs.mkdirSync(carpetaPedidos);
    console.log('📁 Carpeta de pedidos creada');
}

// Función para detectar si es un pedido (actualizado para 🔷 NUEVO PEDIDO)
function esPedido(mensaje) {
    // Verificar que el mensaje empiece con "🔷 NUEVO PEDIDO" o "🍽️ NUEVO PEDIDO"
    const mensajeTrimmed = mensaje.trim();
    return mensajeTrimmed.startsWith(' NUEVO PEDIDO') || 
           mensajeTrimmed.startsWith(' NUEVO PEDIDO');
}

// Función para extraer información del pedido
function procesarPedido(mensaje, numeroRemitente) {
    const fechaActual = new Date();
    const timestamp = fechaActual.toISOString();
    
    // Extraer información básica (actualizado para formato con 🔷)
    const fechaMatch = mensaje.match(/ Fecha: ([^\n]+)/) || mensaje.match(/ Fecha: ([^\n]+)/);
    const horaMatch = mensaje.match(/ Hora: ([^\n]+)/) || mensaje.match(/ Hora: ([^\n]+)/);
    const totalMatch = mensaje.match(/TOTAL: \$?([0-9,]+\.?[0-9]*)/);
    const tipoEntregaMatch = mensaje.match(/ TIPO DE ENTREGA:\s*([^\n]+)/) || mensaje.match(/ TIPO DE ENTREGA:\s*([^\n]+)/);
    
    // Extraer productos (buscar líneas que empiecen con números)
    const productos = [];
    const lineas = mensaje.split('\n');
    let enSeccionProductos = false;
    
    for (let i = 0; i < lineas.length; i++) {
        const linea = lineas[i].trim();
        
        if (linea.includes('DETALLE DEL PEDIDO') || linea.includes('🔷 DETALLE DEL PEDIDO')) {
            enSeccionProductos = true;
            continue;
        }
        
        if (linea.includes('RESUMEN:') || linea.includes('🔷 RESUMEN:') || linea.includes('💰')) {
            enSeccionProductos = false;
            continue;
        }
        
        if (enSeccionProductos && /^\d+\./.test(linea)) {
            // Es un producto (empieza con número y punto)
            const producto = {
                nombre: linea.replace(/^\d+\.\s*/, ''),
                cantidad: null,
                precio: null,
                subtotal: null
            };
            
            // Buscar cantidad, precio y subtotal en las siguientes líneas
            for (let j = i + 1; j < Math.min(i + 4, lineas.length); j++) {
                const siguienteLinea = lineas[j].trim();
                
                if (siguienteLinea.includes('Cantidad:')) {
                    producto.cantidad = siguienteLinea.replace('Cantidad:', '').trim();
                }
                if (siguienteLinea.includes('Precio unitario:')) {
                    producto.precio = siguienteLinea.replace('Precio unitario:', '').trim();
                }
                if (siguienteLinea.includes('Subtotal:')) {
                    producto.subtotal = siguienteLinea.replace('Subtotal:', '').trim();
                }
            }
            
            productos.push(producto);
        }
    }
    
    const pedidoProcesado = {
        timestamp: timestamp,
        fechaRecepcion: fechaActual.toLocaleString('es-AR'),
        numeroRemitente: numeroRemitente,
        fechaPedido: fechaMatch ? fechaMatch[1] : 'No encontrada',
        horaPedido: horaMatch ? horaMatch[1] : 'No encontrada',
        productos: productos,
        total: totalMatch ? totalMatch[1] : 'No encontrado',
        tipoEntrega: tipoEntregaMatch ? tipoEntregaMatch[1] : 'No especificado',
        mensajeOriginal: mensaje
    };
    
    return pedidoProcesado;
}

// Función para guardar pedido en archivo
function guardarPedido(pedido) {
    const fecha = new Date();
    const nombreArchivo = `pedido_${fecha.getFullYear()}-${(fecha.getMonth()+1).toString().padStart(2,'0')}-${fecha.getDate().toString().padStart(2,'0')}_${fecha.getHours().toString().padStart(2,'0')}-${fecha.getMinutes().toString().padStart(2,'0')}-${fecha.getSeconds().toString().padStart(2,'0')}.json`;
    
    const rutaArchivo = path.join(carpetaPedidos, nombreArchivo);
    
    try {
        fs.writeFileSync(rutaArchivo, JSON.stringify(pedido, null, 2), 'utf8');
        console.log(`💾 Pedido guardado en: ${nombreArchivo}`);
        return true;
    } catch (error) {
        console.error('❌ Error al guardar pedido:', error);
        return false;
    }
}

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

// Genera el código QR
client.on('qr', qr => {
    console.log('\n' + '📖'.repeat(25));
    console.log(' LECTOR DE PEDIDOS - ESCANEA QR:');
    console.log(' Solo lee mensajes, NO responde automáticamente');
    console.log('📖'.repeat(25));
    qrcode.generate(qr, {small: true});
    console.log('📖'.repeat(25) + '\n');
});

// Conexión exitosa
client.on('ready', () => {
    console.log('\n' .repeat(40));
    console.log(' LECTOR DE PEDIDOS CONECTADO');
    console.log(' Modo: SOLO LECTURA (sin respuestas automáticas)');
    console.log(' Carpeta de guardado:', carpetaPedidos);
    console.log('✅'.repeat(40) + '\n');
});

// Manejo de errores
client.on('auth_failure', msg => {
    console.error('❌ Error de autenticación:', msg);
});

client.on('disconnected', (reason) => {
    console.log('⚠️ Cliente desconectado:', reason);
});

// SOLO LEER mensajes que empiecen con 🔷 o 🍽️ NUEVO PEDIDO
client.on('message', message => {
    // DEBUG: Mostrar TODOS los mensajes que llegan
    console.log('\n🔍 MENSAJE DETECTADO:');
    console.log('📱 De:', message.from);
    console.log('🤖 Es mío:', message.fromMe);
    console.log('📝 Contenido:', message.body);
    console.log('🔍'.repeat(40));

    // ⚠️ COMENTADO PARA TESTING - Permitir procesar mensajes propios
    // IMPORTANTE: Descomenta esto cuando termines las pruebas
    // if (message.fromMe) {
    //     return;
    // }

    const numeroRemitente = message.from;
    const contenido = message.body;
    
    // VERIFICAR si es un pedido
    const esPedidoDetectado = esPedido(contenido);
    console.log('🍽️ ¿Es pedido?:', esPedidoDetectado);
    
    if (esPedidoDetectado) {
        // Log del pedido detectado
        console.log('\n' + '📩'.repeat(20));
        console.log('📱 Mensaje recibido de:', numeroRemitente);
        console.log('🕐 Hora:', new Date().toLocaleString('es-AR'));
        console.log('🍽️ ¡PEDIDO DETECTADO!');
        console.log('📩'.repeat(20));
        
        // Procesar el pedido
        const pedidoProcesado = procesarPedido(contenido, numeroRemitente);
        
        // Mostrar información del pedido en consola
        console.log('\n' + '🍽️'.repeat(30));
        console.log('📋 INFORMACIÓN DEL PEDIDO:');
        console.log('🕐 Fecha/Hora:', pedidoProcesado.fechaPedido, pedidoProcesado.horaPedido);
        console.log('👤 Cliente:', numeroRemitente);
        console.log('💰 Total:', pedidoProcesado.total);
        console.log('🚚 Entrega:', pedidoProcesado.tipoEntrega);
        
        console.log('\n🛒 PRODUCTOS:');
        pedidoProcesado.productos.forEach((producto, index) => {
            console.log(`${index + 1}. ${producto.nombre}`);
            if (producto.cantidad) console.log(`   Cantidad: ${producto.cantidad}`);
            if (producto.precio) console.log(`   Precio: ${producto.precio}`);
            if (producto.subtotal) console.log(`   Subtotal: ${producto.subtotal}`);
        });
        
        console.log('🍽️'.repeat(30) + '\n');
        
        // Guardar pedido en archivo
        if (guardarPedido(pedidoProcesado)) {
            console.log('✅ Pedido procesado y guardado exitosamente');
        }
    } else {
        console.log('❌ No es un pedido - mensaje ignorado\n');
    }
});

// Inicializar cliente
client.initialize()
    .then(() => {
        console.log('🔄 Lector de pedidos inicializado...');
    })
    .catch(err => {
        console.error('❌ Error al inicializar:', err);
    });

module.exports = app;