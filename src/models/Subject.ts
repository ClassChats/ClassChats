import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class Subject extends Sequelize.Model {}
Subject.init({
	name: Sequelize.STRING,
}, { sequelize, modelName: 'subject'});

/*
	reference university  bc we  want  to show
	subjects that only appear for a particular
	university in the dropdown menu
*/
import University = require('./University');
Subject.belongsTo(University, {
	foreignKey: {
		allowNull: false,
	}
});

export = Subject;
