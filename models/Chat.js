const Sequelize = require('sequelize');
const sequelize = require('../connectors/dbConnector');

class Chat extends Sequelize.Model {}
Chat.init({
	link: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
	},
	owner_id: {
		type: Sequelize.INTEGER,
		references: {
			model: 'User',
			key: 'id'
		}
		// allow null in case user deletes acct
	},
	class_id: {
		type: Sequelize.INTEGER,
		references: {
			model: 'Class',
			key: 'id'
		},
		allowNull: false,
	},
	service_id: {
		type: Sequelize.INTEGER,
		references: {
			model: 'Service',
			key: 'id'
		}
		// allow null in case unknown service
	},
}, { sequelize, modelName: 'Chat'});

module.exports = Chat;