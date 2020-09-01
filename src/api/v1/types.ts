import { Sequelize } from 'sequelize/types';
import * as fastify from 'fastify';

export interface FastifyInstance extends fastify.FastifyInstance {
    db: Sequelize;
}
