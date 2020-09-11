import * as sequelize from 'sequelize/types';
import * as fastify from 'fastify';

/**
 * Extends fastify.FastifyInstance to add the `db` property for better TypeScript interop.
 */
export interface FastifyInstance extends fastify.FastifyInstance {
    db: sequelize.Sequelize;
}
