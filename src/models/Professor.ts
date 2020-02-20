const Sequelize = require('sequelize');
const sequelize = require('../connectors/dbConnector');

class Professor extends Sequelize.Model {}
Professor.init({
	name: Sequelize.STRING 
}, { sequelize, modelName: 'Professor'});

module.exports = Professor;