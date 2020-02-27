// Define the top-level routes.
import * as fastify from 'fastify';
import * as defaultTest from '../accessors/defaultPage'
import { handler } from '../handlers/signup';

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
        if(request.body.email == null){
            return {};
        }
        await handler(request);
        return {
            type: 'signup page',
            payload: request.body,
        };
    });
    
    app.get('/defaultTest', async(request: fastify.FastifyRequest, reply) => {
        return {
            type: 'default test with alias',
            hostnameAlias: request.query.hostnameAlias,
            result: await (defaultTest.defaultResults(request.query.hostnameAlias))
        }
    });
    done();
}

export = routes;
