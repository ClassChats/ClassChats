// Define the routes for domains. This is accessed via /:domain
import {routes as courseRoutes} from './c/course';

async function routes(app, opts, done) {
    app.get('/', async (request, reply) => {
        reply.send({
            type: 'domain',
            domain: request.params.domain,
        });
    });
    
    // Register the domain route
    app.register(courseRoutes, {prefix: '/c'});
    
    done();
}

export {routes};
