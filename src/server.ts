// Set up environment variables
require('dotenv').config();

// Require the framework and instantiate it
import fastifyModule from 'fastify';
const fastify = fastifyModule({ logger: true });

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
fastify.register(require('./src/routes/base'));
fastify.register(require('./src/routes/domain/domain'), {prefix: '/:domain'});
fastify.register(require('./src/routes/admin'), {prefix: '/admin'});


// Run the server!
async function start() {
    try {
        await fastify.listen(3000);
        fastify.log.info(`server listening on ${(fastify.server.address() as AddressInfo).port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}
start();
