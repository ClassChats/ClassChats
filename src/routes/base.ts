// Define the top-level routes.
import * as fastify from 'fastify';
import * as defaultTest from '../accessors/defaultPage'

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
    
    app.get('/defaultTest', async(request: fastify.FastifyRequest, reply) => {
        return {
            type: 'default test',
            result: defaultTest.defaultResults()
        }
    });
    done();
}

export = routes;
