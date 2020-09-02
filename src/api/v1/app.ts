import Fastify = require('fastify');
import sequelize = require('../../db/setup');

const fastify = Fastify({ logger: true });

// Add a Sequelize instance to our Fastify instance
fastify.decorate('db', sequelize);

// Register routes
const routes = {
    universities: require('./universities'),
};

fastify.register(routes.universities, {
    prefix: '/universities',
});

// Run the server!
fastify.listen(3000, '0.0.0.0', function(err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
});
