const Sequelize = require('sequelize');

class University extends Sequelize.Model {}
University.init({
	domain: {
		type: Sequelize.STRING,
		allowNull: false,
	}
	hostname: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	hostnameAlias: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	}
	nameApproved: {
		type: Sequelize.BOOLEAN,
		default: false,
		allowNull: false,
	},
	university_group_id: {
		type: Sequelize.INTEGER,
		references: {
			model: UniversityGroup,
			key: 'id'
		}
	}
}, { sequelize, modelName: 'university'});

module.exports = University;