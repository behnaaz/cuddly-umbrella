var QRCode = require('qrcode');
const fs = require('fs');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const SESSION_FILE_PATH="session.json";
client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    QRCode.toFile('qr.png', qr, {
  color: {
    dark: '#000',  // Blue dots
    light: '#FFFF' // Transparent background
  }
}, function (err) {
  if (err) throw err
})
console.log('done')
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionCfg=session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.error(err);
        }
    });
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessfull
    console.error('AUTHENTICATION FAILURE', msg);
});
    var json = [];
client.on('ready', () => {
    console.log('Client is ready!');

    var chats = client.getChats().then(function(l) { 
    	for (var i in l) {
    	    console.log(i);
    	        l[i].fetchMessages().then(function(msg){
    	            	  //  console.log(msg);
    	            	    json.push(msg);
    	           // if (msg[0]) {   json.push(msg[0].body);    }
    	        });
    	}
    	   	    console.log("=============================");
    	    console.log(JSON.stringify(json));
    	    
    	    fs.writeFile("chatha.json", JSON.stringify(json), function (err) {
        if (err) {
            console.error(err);
        }
         
    });
    } ).then(function() {
    console.log('Finalllllly!'+JSON.stringify(json));
     fs.writeFile("chatha2.json", JSON.stringify(json), function (err) {
        if (err) {
            console.error(err);
        }
    }); throw err; });
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
    console.log("behmsg:"+JSON.stringify(msg));
});



client.initialize();
