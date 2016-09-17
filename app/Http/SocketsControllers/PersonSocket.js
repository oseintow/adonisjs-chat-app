'use strict'

const Config= use('Config');

class PersonSocket{

    constructor(io){
        this.io = io;
        this.personIO = this.io.of("/persons");
        this.personIO.on('connection', (socket) => this.init(socket) );
        this.persons = [];
        this.users = [];
    }

    init(socket) {
        this.disconnect(socket);
        this.newUser(socket);
        this.getUsers(socket);
        this.newMessage(socket);
        this.leave(socket);
    }

    disconnect(socket){
        socket.on('disconnect', () => console.log(`client disconnected`));
    }

    newUser(socket){
        socket.on("new user", (data, callback) =>{
            socket.join(data);
            callback({message: "Name added to room"});
            if(this.persons.indexOf(data) < 0){
                this.persons.push(data);
                socket.broadcast.emit("new user", {user : data});
            }
        });
    }

    getUsers(socket){
        socket.on("get users", (callback) =>{
            callback({users: this.persons})
        });
    }

    leave(socket){
        socket.on("leave", (data) =>{
            this.personIO.in(data).clients((error, clients)  =>{
                if (error) throw error;
                if (clients.length == 1) {
                    var personIndex = this.persons.indexOf(data);
                    this.persons.splice(personIndex, 1);
                    socket.broadcast.emit("user left",data);
                }
            });
            socket.leave(data);
            socket.disconnect();
        });
    }

    newMessage(socket){
        socket.on("new message", (data) =>{
            // this.users[data.receiver].emit("get message",data.message);
            this.personIO.in(data.receiver).emit("get message",data.message);
        });
    }

}

module.exports = PersonSocket;
