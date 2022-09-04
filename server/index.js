const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const cors = require("cors");
const router = require("./router");
const { addUser, getUser, getUsersInRoom, removeUser } = require('./users');

const app = express();

// app.use(cors())
app.use(router);

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('new connection is generated');
    socket.on('join', ({name, room}, callback) => {
        const { error, user } = addUser({id: socket.id, name, room})
        if(error) callback({error: '에러가 발생했습니다.'})
        console.log(user);
        socket.emit('message', {
            user: 'admin',
            text: `${user.name}, ${user.room}에 오신것을 환영합니다.`,
        })
        socket.broadcast.to(user.room).emit('message', {
            user: 'admin',
            text: `${user.name} 님이 가입하셨습니다`,
        })
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room),
        })
        socket.join(user.room);

        callback();
    });
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit("message", {user: user.name, text: message})
        callback();
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit("message", {
                user: 'admin',
                text: `${user.name} 님이 방을 나갔습니다`,
            })
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
        console.log("유저가 떠났어용")
    })
})

server.listen(5000, () => {
    console.log('server listening to port 5000');
})