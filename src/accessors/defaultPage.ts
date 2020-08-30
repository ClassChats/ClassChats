import Sequelize = require('sequelize');
const { Op } = require('sequelize');
require('dotenv').config();
import sequelize = require('../connectors/dbConnector');
//import * as fastify from 'fastify';
import * as models from '../models/models';

export async function defaultResults(
    hostnameAlias: string,
    offset: number = 0,
) {
    let uni_id = await models.University.findOne({
        where: {
            hostnameAlias: hostnameAlias,
        },
    });

    if (uni_id == null) {
        return [];
    }
    uni_id = uni_id.id;

    let rooms = await models.Room.findAll({
        attributes: ['id', 'number', 'building.name'],
        include: [
            {
                model: models.Building,
                where: {
                    UniversityId: uni_id,
                },
            },
            {
                model: models.Class,
                right: true,
                /*
                include: [
                    {
                        model: models.Chat,
                        right: true
                    }
                ]
                */
            },
        ],
        offset: offset,
        limit: 5,
    });
    let result = [] as Object[];
    for (let i = 0; i < rooms.length; i++) {
        result.push({
            roomId: rooms[i].id,
            buildingName: rooms[i].building.name,
            roomNumber: rooms[i].number,
        });
    }
    return result;
}
