#! /usr/bin/env node

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

io.on('connection', socket => {
    console.log('user connected');
    socket.join('chat').on('message', msg => {
        socket.to('chat').emit('message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('lets do this shit');
});
