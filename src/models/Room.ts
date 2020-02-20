import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class Room extends Sequelize.Model {}
Room.init({
	number: {
		type: Sequelize.STRING,
		allowNull: false,
		// Not a problem for online classes because class's room is null
	},
	coordinates: {
		type: Sequelize.GEOMETRY('POINT'),
	},
}, { sequelize, modelName: 'Room'});

import Building = require('./Subject');
Room.hasOne(Building)
export = Room;
