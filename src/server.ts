// Set up environment variables
require('dotenv').config();

// Require the framework and instantiate it
import fastifyFactory from 'fastify';
const fastify = fastifyFactory({ logger: true });

// Route imports
import adminRoutes = require('./routes/admin');
import baseRoutes = require('./routes/base');
import domainRoutes = require('./routes/domain/domain');

// Other imports
import { AddressInfo } from 'net';

// Redirect trailing slashes to non-trailing slashes
fastify.addHook('onRequest', (request, reply, done) => {
    console.log(request.req.url);
    if (request.req.url!.match(/\/.*\/+$/)) {
        // Replace empty string with '/' to avoid issues with the root path
        const newUrl = request.req.url!.replace(/\/+$/, '') === '' ? '/' : '';
        reply.redirect(301, newUrl);
    }

    done();
});

// Register base and prefixed routes
fastify.register(baseRoutes);
fastify.register(domainRoutes, { prefix: '/:domain' });
fastify.register(adminRoutes, { prefix: '/admin' });

// Run the server!
async function start() {
    try {
        await fastify.listen(3000, '0.0.0.0');
        fastify.log.info(
            `server listening on ${
                (fastify.server.address() as AddressInfo).port
            }`,
        );
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();
