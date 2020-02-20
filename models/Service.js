const Sequelize = require('sequelize');

class Service extends Sequelize.Model {}
Service.init({
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
}, { sequelize, modelName: 'service'});

module.exports = Service;