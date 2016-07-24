'use strict'

const Config = use('Config');
const Redis = use('Redis');

module.exports =  (io) => {
    // const io = use('socket.io')(server);
    var persons = [];
    var person = io.of("/persons");

    person.on('connection', (socket) => {
        // console.log("connecting", socket.io);
        // socketio.socket = socket

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
};