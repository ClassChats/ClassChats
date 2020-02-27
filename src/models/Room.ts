import Sequelize = require('sequelize');
import sequelize = require('../connectors/dbConnector');

class Room extends Sequelize.Model {}
Room.init(
    {
        number: {
            type: Sequelize.STRING,
            allowNull: false,
            // Not a problem for online classes because class's room is null
        },
        coordinates: {
            type: Sequelize.GEOMETRY('POINT'),
        },
    },
    { sequelize, modelName: 'room' },
);

import Building = require('./Building');
import Class = require('./Class');
Room.belongsTo(Building);
//Room.hasMany(Class);
export = Room;
