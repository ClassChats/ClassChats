import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class Professor extends Sequelize.Model {}
Professor.init({
	name: Sequelize.STRING 
}, { sequelize, modelName: 'professor'});

export = Professor;
