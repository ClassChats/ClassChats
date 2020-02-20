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
		type: Sequelize.STRING,
	},
}, { sequelize, modelName: 'email'});

module.exports = Email;