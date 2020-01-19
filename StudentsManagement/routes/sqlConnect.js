const {Model} = require('objection');
const Knex = require('knex');

const knex = Knex({
    client: 'mysql',
    connection: {
        user: 'guest',
        password: 'guest',
        database: 'students_info'
    }
});

Model.knex(knex);

class Students extends Model {
    static get tableName() {
        return 'students';
    }
}

class LoginInfo extends Model {
    static get tableName() {
        return 'login_info';
    }
}

module.exports = {
    Students,
    LoginInfo,
    knex
};