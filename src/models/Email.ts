import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class Email extends Sequelize.Model {}
Email.init({
	email: {
		type: Sequelize.STRING
	},
	verified: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	verifyCode: {
		// We'll do a check to see how long ago the record was updated. If it's too long
		// ago, send a new email and switch teh cerify code.
		type: Sequelize.STRING,
	},
}, { sequelize, modelName: 'Email'});
import User = require('./User');
Email.belongsTo(User, {
	foreignKey: {
		allowNull: false,
	}
});
export = Email;
