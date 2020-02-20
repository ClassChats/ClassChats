const Sequelize = require('sequelize');
const sequelize = require('../connectors/dbConnector');

class Building extends Sequelize.Model {}
Building.init({
	name: Sequelize.STRING 
}, { sequelize, modelName: 'Building'});

module.exports = Building;