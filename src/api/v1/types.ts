import * as sequelize from 'sequelize/types';
import * as fastify from 'fastify';

/**
 * Extends fastify.FastifyInstance to add the `db` property for better TypeScript interop.
 */
export interface FastifyInstance extends fastify.FastifyInstance {
    db: sequelize.Sequelize;
}

/**
 * A reply from the API.
 */
export type Reply = GoodReply | BadReply;

/**
 * A reply that indicates success.
 */
export interface GoodReply {
    ok: true;
    result?: unknown;
}

/**
 * A reply that indicates failure.
 */
export interface BadReply {
    ok: false;
    reason?: string;
}
