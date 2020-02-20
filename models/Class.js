const Sequelize = require('sequelize');

class Class extends Sequelize.Model {}
Class.init({
	section: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null
	},
	daysOfWeek: {
		type: Sequelize.TINYINT,
		defaultValue: 0
	},
	startTime: {
		type: Sequelize.TIME,
		allowNull: true,
		defaultValue: null
	},
	course_id: {
		type: Sequelize.INTEGER,
		references: {
			model: Course,
			key: 'id'
		}
	},
	room_id: {
		type: Sequelize.INTEGER,
		references: {
			model: Room,
			key: 'id'
		}
	},
	professor_id: {
		type: Sequelize.INTEGER,
		references: {
			model: Professor,
			key: 'id'
		}
	}
}, { sequelize, modelName: 'class'});

module.exports = Class;