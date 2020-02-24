import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class UniversityGroup extends Sequelize.Model {}
UniversityGroup.init({
	name: {
		type: Sequelize.STRING,
		unique: true,
	}
}, { sequelize, modelName: 'universityGroup'});

export = UniversityGroup;
