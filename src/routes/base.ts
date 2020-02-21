// Define the top-level routes.
import * as fastify from 'fastify';

async function routes(app: fastify.FastifyInstance, opts, done) {
    // Homepage
    app.get('/', async (request, reply) => {
        return {
            type: 'homepage',
        };
    });

    // Log In
    app.get('/login', async (request, reply) => {
        return {
            type: 'login page',
        };
    });

    // Sign Up
    app.get('/signup', async (request, reply) => {
        return {
            type: 'signup page',
        };
    });

    app.post('/signup', async (request: fastify.FastifyRequest, reply) => {
        return {
            type: 'signup page',
            payload: request.body,
        };
    });

    done();
}

export = routes;
