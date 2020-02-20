// Define the routes for the admin interface. This is accessed via /admin
import * as fastify from 'fastify';
import * as roadblocks from '../helpers/roadblocks';

async function routes(fastify: fastify.FastifyInstance, opts, done) {
    // Require administrator privileges to access this area.
    fastify.register(roadblocks.requireAdmin);
    
    fastify.get('/', async (request, reply) => {
        return {
            type: 'admin',
        };
    });
    
    done();
}

export = routes;
