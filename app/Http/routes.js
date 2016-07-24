'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')
const Redis = use('Redis');

Route.on('/').render('welcome')

Route.get("/music", function *(request, response) {
    Redis.publish('music', {id: 1, title: 'Love me like you do', artist: 'Ellie goulding'})
    yield response.sendView('socket');
});

Route.get("/chat", function *(request, response) {
    yield response.sendView('chat');
});


Route.get('/users', 'UsersController.index');


Route.route('/welcome', 'GET', function * () {

})
