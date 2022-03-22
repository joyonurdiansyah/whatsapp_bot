const { Client } = require('whatsapp-web.js');
var qrcode = require('qrcode-terminal');
var fs = require("fs");
 
const SESSION_FILE_PATH = './session.json';
let sessionCfg;
var client;
 
try{
    if (fs.existsSync(SESSION_FILE_PATH)) {
            sessionCfg = require(SESSION_FILE_PATH);
    }
 
    client = new Client({session: sessionCfg});
}
 
catch(err){
    client = new Client();
}
 
 
client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});
 
 
client.on('qr', (qr) => {
        // Generate and scan this code with your phone
        console.log('QR RECEIVED', qr);
 
    qrcode.generate(qr, {small: true}, function (qrcode) {
            console.log(qrcode)
    });
 
});
 
client.on('ready', () => {
    console.log('Client is ready!');
});
 
client.on('message', msg => {
        if (msg.body == '!ping') {
            msg.reply('pong');
        }
 
    if (msg.body == "selamat pagi") {
        client.sendMessage(msg.from, 'selamat pagi juga');
    }
 
});
 
client.initialize();