const Sequelize = require('sequelize');

class UniversityGroup extends Sequelize.Model {}
Service.init({
	name: {
		type: Sequelize.STRING,
		unique: true,
	}
}, { sequelize, modelName: 'universitygroup'});

module.exports = UniversityGroup;