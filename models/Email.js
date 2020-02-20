const Sequelize = require('sequelize');

class Email extends Sequelize.Model {}
Email.init({
	user_id: {
		type: Sequelize.INTEGER,
		references:{
			model: User,
			key: 'id'
		}
	},
	email: {
		type: Sequelize.STRING
	},
	verified: {
		type: Sequelize.BOOLEAN,
		default: false,
	},
	verifyCode: {
		// We'll do a check to see how long ago the record was updated. If it's too long
		// ago, send a new email and switch teh cerify code.
		type: Sequelize.STRING,
	},
}, { sequelize, modelName: 'email'});

module.exports = Email;