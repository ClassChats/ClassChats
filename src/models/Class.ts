import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class Class extends Sequelize.Model {}
Class.init(
    {
        section: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
        },
        daysOfWeek: {
            // Stored as a 7-bit integer where each bit represents a day of the week.
            // Online classes are set to 0.
            type: Sequelize.TINYINT,
            defaultValue: 0,
        },
        startTime: {
            type: Sequelize.TIME,
            allowNull: true,
            defaultValue: null,
        },
    },
    { sequelize, modelName: 'class' },
);

import Course = require('./Course');
import Room = require('./Room');
import Professor = require('./Professor');
Class.belongsTo(Course, {
    foreignKey: {
        allowNull: false,
    },
});
Class.belongsTo(Room);
Class.belongsTo(Professor, {
    foreignKey: {
        allowNull: false,
    },
});
export = Class;
