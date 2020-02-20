const Sequelize = require('sequelize');
const sequelize = require('../connectors/dbConnector');

class Professor extends Sequelize.Model {}
Professor.init({
	name: Sequelize.STRING 
}, { sequelize, modelName: 'professor'});

module.exports = Professor;