'use strict'

const Config = use("Config");

class SocketIO{

    static get io(){
        return Config.get("socket.io");
    }

    static set io(value){
        Config.set("socket.io",value)
    }

    static get socket(){
        return Config.get("socket.socket");
    }

    static set socket(value){
        Config.set("socket.socket",value)
    }

}

module.exports = SocketIO;