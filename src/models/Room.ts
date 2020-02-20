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
	building_id: {
		type: Sequelize.INTEGER,
		references: {
			model: 'Buildings',
			key: 'id'
		}
	}
}, { sequelize, modelName: 'Room'});

export = Room;
