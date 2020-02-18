// Require the framework and instantiate it
import * as fastify from 'fastify';
const app = fastify({ logger: true });

// Declare the routes
app.get('/', async (request, reply) => {
  return 'homepage';
});

// Register the domain route
import {routes as domainRoutes} from './routes/domain/domain';
app.register(domainRoutes, {prefix: '/:domain'});

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
