'use strict'

const User = use('App/Model/User');

class UsersController {

  * index(request, response) {
      const users = yield User.all();

      yield response.sendView('user_index', { users: users.toJSON() })
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    //
  }

  * show(request, response) {
    //
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}

module.exports = UsersController
