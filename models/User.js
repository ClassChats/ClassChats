const Sequelize = require('sequelize');
const sequelize = require('../connectors/dbConnector');

class User extends Sequelize.Model {}
User.init({
	password: Sequelize.STRING,
}, { sequelize, modelName: 'user'});

module.exports = User;