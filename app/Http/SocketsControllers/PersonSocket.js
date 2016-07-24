'use strict'

const Config= use('Config');
const log = Config.get('logger');

class PersonSocket{

    constructor(io){
        this.io = io;
        this.personRoom = this.io.of("/persons");
        this.personRoom.on('connection', (socket) => {
            this.init(socket)
        });
        this.persons = [];
        this.messages = [];
        this.users = [];
    }

    init(socket) {;
        this.newUser(socket);
        this.getUsers(socket);
        this.newMessage(socket);
    }

    newUser(socket){
        socket.on("new user", (data, callback) =>{
            if(!this.persons.indexOf(data) > -1){
                // console.log("Room already exist")
                this.persons.push(data);
                // return;
            }

            this.users[socket.id] = data;
            console.log(this.users[socket.id]);
            console.log(socket.id);
            console.log(this.users);
            socket.join(data);
            callback({message: "Name added to room"});
            socket.broadcast.emit("new user", {user : data});
        });


    }

    getUsers(socket){
        socket.on("get users", (callback) =>{
            callback({users: this.persons})
        });
    }

    newMessage(socket){
        socket.on("new message", (data) =>{
            var rooms = socket.room;
            console.log(rooms);
            this.personRoom.in(data.receiver).emit("get message",data.message);
            console.log(data);
        });
    }


}

module.exports = PersonSocket;
