// Require the framework and instantiate it
import * as fastify from 'fastify';
const app = fastify({ logger: true });

// Other imports
import { AddressInfo } from 'net';

// Redirect trailing slashes to non-trailing slashes
app.addHook('onRequest', (request, reply, done) => {
    console.log(request.req.url);
    if (request.req.url.match(/.*\/+$/)) {
        reply.redirect(301, request.req.url.replace(/\/+$/, ''));
    }
    
    done();
});

// Import the routes
import {routes as baseRoutes} from './routes/base';
import {routes as domainRoutes} from './routes/domain/domain';
import {routes as adminRoutes} from './routes/admin';

// Register base and prefixed routes
app.register(baseRoutes);
app.register(domainRoutes, {prefix: '/:domain'});
app.register(adminRoutes, {prefix: '/admin'});


// Run the server!
async function start() {
    try {
        await app.listen(3000);
        app.log.info(`server listening on ${(app.server.address() as AddressInfo).port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}
start();
