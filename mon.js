var express = require('express')(handler);
var app = require('http').Server(express);
var io = require('socket.io')(app);

// var app = require('http').createServer(handler);
// var io = require('socket.io')(app);

var Redis = require('ioredis');
var redis = new Redis();

var users = {};
var messages = [];


app.listen(3300, function() {
    console.log('Server is running!');
});

function handler(req, res) {
    res.writeHead(200);
    res.end('');
}

var persons = [];
person = io.of("/persons");

person.on('connection', function(socket) {
    socket.on("new user", (data, callback) =>{
        // socket.room = data;
        if(persons.indexOf(data) > -1){
            console.log("Room already exist")
            return;
        }
        persons.push(data);
        console.log(persons);
        socket.room = data;
        console.log("room", socket.room);
        socket.join(data);
        var rooms = socket.adapter.rooms;
        // log.info(rooms);
        // log.info("================first============================")
        // var roomAdapter = socket.adapter.rooms[data].sockets;
        // log.info(roomAdapter);
        // log.info("==================second==========================")
        // var roomAdapt = socket.adapter.rooms;
        // log.info(roomAdapt);
        // log.info("==================third==========================")
        callback({message: "Name added to room"});
        socket.broadcast.emit("new user", {user : data});
    });

    socket.on("new message", (data) =>{
        var rooms = socket.adapter.rooms[data.receiver].sockets;
        console.log(rooms);
        var rm = data.receiver;
        console.log(Object.keys(rooms)[0]);
        person.in(data.receiver).emit("get message",data.message);
        console.log(data);
    });
});

redis.psubscribe('*', function(err, count) {
    console.log("in redis pub")
});


redis.on('pmessage', function(subscribed, channel, message) {
    console.log('Message Recieved: ' + message);
    console.log('Message Channel: ' + channel);
    message = JSON.parse(message);

    if(message.event == "App\\Events\\AddUsersToSocket"){
        console.log("Am in Add users to socket");
        // michael.emit("whisper" + ":" + message.event, message.data);
    }

    io.emit(channel + ':' + message.event, message.data);
});