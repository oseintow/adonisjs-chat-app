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
    }

    init(socket) {;
        this.newUser(socket);
        this.getUsers(socket);
        this.newMessage(socket);
        this.leave(socket);
    }

    newUser(socket){
        socket.on("new user", (data, callback) =>{
            socket.join(data);
            callback({message: "Name added to room"});
            if(this.persons.indexOf(data) < 0){
                this.persons.push(data);
                socket.broadcast.emit("new user", {user : data});
            }
            console.log(this.persons);
        });
    }

    getUsers(socket){
        socket.on("get users", (callback) =>{
            callback({users: this.persons})
        });
    }

    leave(socket){
        socket.on("leave", (data) =>{
            this.personRoom.in(data).clients((error, clients)  =>{
                if (error) throw error;
                if (clients.length == 1) {
                    var personIndex = this.persons.indexOf(data);
                    this.persons.splice(personIndex, 1);
                }
                console.log(this.persons);
            });
            socket.leave(data);
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
