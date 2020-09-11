import sequelize from '../../db/setup';

// Types
import type { FastifyInstance } from 'fastify';

// Routes
import universities from './universities';

export default async function api(fastify: FastifyInstance, options): Promise<void> {
    // Add a Sequelize instance to our Fastify instance
    fastify.decorate('db', sequelize);

    // Register routes
    fastify.register(universities, {
        prefix: '/universities',
    });
}
