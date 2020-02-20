const Sequelize = require('sequelize');

class Subject extends Sequelize.Model {}
Subject.init({
	name: Sequelize.STRING,
	university_id: {
		/*
			reference university  bc we  want  to show
			subjects that only appear for a particular
			university in the dropdown menu
		*/
		type: Sequelize.INTEGER,
		references: {
			model: University,
			key: 'id',
		}
	}
}, { sequelize, modelName: 'subject'});

module.exports = Subject;