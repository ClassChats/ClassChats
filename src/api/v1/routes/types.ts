import { Sequelize } from 'sequelize/types';
import * as fastify from 'fastify';

interface FastifyInstance extends fastify.FastifyInstance {
    db: Sequelize;
}
