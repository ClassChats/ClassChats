// Require the framework and instantiate it
import * as fastify from 'fastify';
const app = fastify({ logger: true });

// Import the routes
import {routes as domainRoutes} from './routes/domain/domain';
import {routes as adminRoutes} from './routes/admin';

// Register prefixed routes
app.register(domainRoutes, {prefix: '/:domain'});
app.register(adminRoutes, {prefix: '/admin'});


// Run the server!
async function start() {
  try {
    await app.listen(3000);
    app.log.info(`server listening on ${app.server.address()}`); //.port
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}
start();
