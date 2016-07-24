'use strict'

const Redis = use('Redis');

Redis.subscribe('music', 'App/Http/RedisControllers/UserController.auth');
Redis.subscribe('test-channel', 'App/Http/RedisControllers/UserController.testChannel');