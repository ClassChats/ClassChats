import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class Building extends Sequelize.Model {}
Building.init({
	name: Sequelize.STRING,
}, { sequelize, modelName: 'building'});

export = Building;
