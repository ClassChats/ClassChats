import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class Course extends Sequelize.Model {}
Course.init({
	number: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	subject_id: {
		type: Sequelize.INTEGER,
		references: {
			model: 'Subjects',
			key: 'id'
		},
		allowNull: false,
	},
	university_id: {
		// To ensure that autofill only shows suggestions for that particular university.
		type: Sequelize.INTEGER,
		references: {
			model: 'Universities',
			key: 'id'
		},
		allowNull: false,
	}
}, { sequelize, modelName: 'Course'});

export = Course;
