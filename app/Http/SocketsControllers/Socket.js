'use strict'

const Config = use('Config');
const Redis = use('Redis');
const socketio = use('App/Http/SocketsControllers/SocketIO');
const UserSocket = use('App/Http/SocketsControllers/UserSocket');
const PersonSocket = use('App/Http/SocketsControllers/PersonSocket');

module.exports =  (server) => {
    const io = use('socket.io')(server);
    const redis = require('socket.io-redis');
    io.adapter(redis(Config.get("redis.cluster")));
    socketio.io = io;

    io.on('connection', (socket) => socketio.socket = socket );

    new PersonSocket(io);
    new UserSocket(io);
};