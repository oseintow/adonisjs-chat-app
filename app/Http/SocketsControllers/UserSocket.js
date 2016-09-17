'use strict'

const Redis = use('Redis');
const Database = use('Database');
const User = use('App/Model/User');
const co = use('co');

class UserSocket{

    constructor(io){
        this.io = io;
        this.io.on('connection', (socket) => this.init(socket) );
    }

    init(socket) {
        this.emit(socket);
    }

    emit(socket){
        socket.on('tom',  (data, callback) =>  {
            callback({name: "socket is working very well with adonis"});

            var self = this;
            self.socket = socket;
            co(function *(){
                self.tom  = yield self.getUsers().next().value;
                // self.socket.emit("sweet", yield self.getUsers().next().value);
                self.socket.emit("sweet", data);
            }).catch((data) => {
                console.error(data);
            });

            console.log("socket id", data);
            this.io.emit("sweet", {"new thing": 'Yaaaay' });
            socket.broadcast.emit("sweet", {"new thing broadcaset": `sending to all except me. socket id ${data}`});
            socket.emit("sweet", {"old thing": 'Hihihihi'});
            socket.emit("sweet",{firstname: "Michael", lastname: "Ntow", othername: "Osei"});
            Redis.publish('music', JSON.stringify({id: 1, title: 'Love me like you do', artist: 'Ellie goulding'}));
        });
    }

    * getUsers() {
        yield User.all();
    }

}

module.exports = UserSocket; 
