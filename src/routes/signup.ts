// Define the routes for the signup interface. This is accessed via /signup
import * as fastify from 'fastify';

async function routes(fastify: fastify.FastifyInstance, opts, done) {    
    fastify.get('/', async (request, reply) => {
        return {
            type: 'signup',
        };
    });
    
    done();
}

export = routes;
