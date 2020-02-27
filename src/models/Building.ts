import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');
import University = require('./University');

class Building extends Sequelize.Model {}
Building.init(
    {
        name: Sequelize.STRING,
    },
    { sequelize, modelName: 'building' },
);

Building.belongsTo(University, {
	foreignKey: {
		allowNull: false,
	}
});
export = Building;
