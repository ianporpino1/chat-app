const express=require('express');
const app= express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/',(req, res)=> {
    res.sendFile(__dirname + '/index.html')
});


const users = [];

function userJoin(id,username)
{
    const user={id, username}
    users.push(user);
    return user;
}


function getCurrentUser(id)
{
    return users.find(user => user.id === id)
} 

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('user',(username) => {
        const user = userJoin(socket.id,username)
        console.log(`${user.username} connected`)
    })

    socket.on('user connect',(username) => {
        userJoin(socket.id,username)
    });

    socket.on('chat message',(msg) => {
        const user = getCurrentUser(socket.id)
        io.emit('chat message',`${user.username} said ${msg}`)
        console.log(`${user.username}: ${msg}`)
    })

    

});
const PORT = process.env.PORT || 3000;

server.listen(3000 , () => {
    console.log(`listening on http://localhost:${PORT}`);
});
