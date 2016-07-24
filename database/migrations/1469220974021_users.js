'use strict'

const Schema = use('Schema')

class UsersSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.increments()
      table.string("firstname");
      table.string("lastname");
      table.string("email").notNullable().unique();
      table.string("password")
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersSchema
