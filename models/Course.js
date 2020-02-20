const Sequelize = require('sequelize');

class Course extends Sequelize.Model {}
Course.init({
	number: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	subject_id: {
		type: Sequelize.INTEGER,
		references: {
			model: Subject,
			key: 'id'
		},
		allowNull: false,
	},
	university_id: {
		type: Sequelize.INTEGER,
		references: {
			model: University,
			key: 'id'
		},
		allowNull: false,
	}
}, { sequelize, modelName: 'course'});

module.exports = Course;