const Sequelize = require('sequelize');
const sequelize = require('../connectors/dbConnector');

class UniversityGroup extends Sequelize.Model {}
UniversityGroup.init({
	name: {
		type: Sequelize.STRING,
		unique: true,
	}
}, { sequelize, modelName: 'universitygroup'});

module.exports = UniversityGroup;