const Sequelize = require('sequelize');

class User extends Sequelize.Model {}
User.init({
	password: Sequelize.STRING,
}, { sequelize, modelName: 'user'});

module.exports = User;