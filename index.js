const express=require('express');
const app= express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/',(req, res)=> {
    res.sendFile(__dirname + '/index.html')
});

var user='';

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('user',(username) => {
        user = username;
        console.log('user: '+ user)
    })

    socket.on('chat message',(msg) => {
        io.emit('chat message',user+' said '+ msg)
        console.log('message: '+ msg)
    })

});

const PORT = 3000;

server.listen(3000 , () => {
    console.log(`listening on http://localhost:${PORT}`);
});

