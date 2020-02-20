import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class Course extends Sequelize.Model {}
Course.init({
	number: {
		type: Sequelize.STRING,
		allowNull: false,
	},
}, { sequelize, modelName: 'Course'});
import Subject = require('./Subject');
import University = require('./University');
Course.hasOne(Subject, {
	foreignKey: {
		allowNull: false,
	}
});

// To ensure that autofill only shows suggestions for that particular university.
Course.hasOne(University, {
	foreignKey: {
		allowNull: false,
	}
});
export = Course;
