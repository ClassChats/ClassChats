import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

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
			model: 'Universities',
			key: 'id',
		}
	}
}, { sequelize, modelName: 'Subject'});

export = Subject;
