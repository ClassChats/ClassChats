const Sequelize = require('sequelize');

class Room extends Sequelize.Model {}
Room.init({
	number: {
		type: Sequelize.STRING,
		allowNull: true
	},
	coordinates: {
		type: Sequelize.GEOMETRY('POINT')  
	},
	building_id: {
		type: Sequelize.INTEGER,
		references: {
			model: Building,
			key: 'id'
		}
	}
}, { sequelize, modelName: 'room'});

module.exports = Room;