import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class Chat extends Sequelize.Model {}
Chat.init({
	link: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},	
}, { sequelize, modelName: 'Chat'});
import User = require('./User');
import Class = require('./Class');
import Service = require('./Service');
Chat.hasOne(User, {
	foreignKey: {
		allowNull: false,
	}
});
Chat.hasOne(Class, {
	foreignKey: {
		allowNull: false,
	}
});
// allow null in case unknown service
Chat.hasOne(Service);
export = Chat;
