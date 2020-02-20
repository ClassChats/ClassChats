const Sequelize = require('sequelize');
const sequelize = require('../connectors/dbConnector');

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
			model: 'Building',
			key: 'id'
		}
	}
}, { sequelize, modelName: 'room'});

module.exports = Room;