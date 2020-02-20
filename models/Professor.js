const Sequelize = require('sequelize');

class Professor extends Sequelize.Model {}
Professor.init({
	name: Sequelize.STRING 
}, { sequelize, modelName: 'professor'});

module.exports = Professor;