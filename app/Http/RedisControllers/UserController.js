'use strict'

const Config= use('Config');
const socketio = use('App/Http/SocketsControllers/SocketIO');
const logger = Config.get('logger');
const Redis = use('Redis');
const User = use('App/Model/User');

class UserController {

    init(){
        socketio.socket.on('tom', function(data,callback){
            callback({name: "hey its good yeh"});

            socketio.socket.emit("sweet",{firstname: "Michael", lastname: "Ntow", othernames: "Osei"});

            Redis.publish('music', JSON.stringify({id: 1, title: 'Love me like you do', artist: 'Ellie goulding'}));
        });
    }

    * auth(track, channel){
        socketio.socket.emit("testing", track);

        // const user = yield User.all();
        // socketio.socket.emit("sweet", user);
        logger.error('Hello distributed error files!');
        logger.log('info','Hello distributed log files!');
        console.log("Track it:",track);
        console.log("Channel:", channel);
    }

    testChannel(track, channel){
        socketio.io.emit("testing", {track: track});
        console.log("Test:",track);
        console.log("Channel:", channel);
    }

}

module.exports = UserController;

