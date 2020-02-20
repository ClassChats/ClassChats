const Sequelize = require('sequelize');

class Building extends Sequelize.Model {}
Building.init({
	name: Sequelize.STRING 
}, { sequelize, modelName: 'building'});

module.exports = Building;