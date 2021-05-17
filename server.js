const express = require('express');
const serverStatic = require('serve-static');
const app = express();
const fs = require("fs");
const https = require("https");
//Configuración
process.env.port = 4002;
app.use(serverStatic(__dirname + "/dist"));

const llavePrivada = fs.readFileSync("private.key");
const certificado = fs.readFileSync("certificate.crt");
const credenciales = {
    key: llavePrivada,
    cert: certificado,
    passphrase: "1234" //passwd de la llave privada usado en la creación del certificado
};

// Configurar cabeceras y cors
//app.use(cors());
const httpsServer = https.createServer(credenciales, app);

httpsServer.listen(process.env.port, () => {
    console.log('Servidor https escuchando por el puerto:', process.env.port);
}).on('error', err => {
    console.log('Error al inciar el servidor:', err);
});
