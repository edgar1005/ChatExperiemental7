var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
require('dotenv').config();
const {guardaMensajes,leeMensajes,guardaChat,leeChat} = require('../helpers/guardar');
const port = process.env.PORT;
const db = require('../database/models/index');

app.use(express.static('public'))

server.listen(port,(req,res)=> {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

app.get('/',(req,res)=>{
    res.status(200).send("Hello");
});

io.on('connection',async(socket)=>{
    console.log('Alguien se ha conectado con Sockets');
    let messages =  await leeChat();
    console.log(messages);
    socket.emit('messages',messages);

    socket.on('new-message',async(data)=>{
        console.log(data);
        await guardaChat(data.msg,data.name);
        let messages =  await leeChat();
        io.sockets.emit('messages',messages)//informa a todos los equipos conectados al socket que un mensaje ha sido emitido
        
    });
});

