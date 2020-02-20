import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class User extends Sequelize.Model {}
User.init({
	password: Sequelize.STRING,
}, { sequelize, modelName: 'User'});

export = User;
