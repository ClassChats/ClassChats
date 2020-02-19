// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });

// Other imports
import { AddressInfo } from 'net';

// Redirect trailing slashes to non-trailing slashes
fastify.addHook('onRequest', (request, reply, done) => {
    console.log(request.req.url);
    if (request.req.url.match(/.*\/+$/)) {
        reply.redirect(301, request.req.url.replace(/\/+$/, ''));
    }
    
    done();
});

// Register base and prefixed routes
fastify.register(require('./routes/base'));
fastify.register(require('./routes/domain/domain'), {prefix: '/:domain'});
fastify.register(require('./routes/admin'), {prefix: '/admin'});


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
