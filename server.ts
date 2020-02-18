// Require the framework and instantiate it
import * as fastify from 'fastify';
const app = fastify({ logger: true });

// Import the routes
import {routes as domainRoutes} from './routes/domain/domain';

// Register prefixed routes
app.register(domainRoutes, {prefix: '/:domain'});

// Declare the routes
app.get('/', async (request, reply) => {
  return 'homepage';
});


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
