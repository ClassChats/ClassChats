import Fastify = require('fastify');
import sequelize = require('../../db/setup');

async function routes(fastify: Fastify.FastifyInstance, options) {
    // Add a Sequelize instance to our Fastify instance
    fastify.decorate('db', sequelize);

    // Register routes
    const routes = {
        universities: require('./universities'),
    };

    fastify.register(routes.universities, {
        prefix: '/universities',
    });
}

export = routes;
