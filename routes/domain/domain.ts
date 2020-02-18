// Define the routes for domains. This is accessed via /:domain

// Import prefixed routes
import {routes as courseRoutes} from './c/course';
import {routes as roomRoutes} from './r/room';
import {routes as searchRoutes} from './search/search';

async function routes(app, opts, done) {
    app.get('/', async (request, reply) => {
        reply.send({
            type: 'domain',
            domain: request.params.domain,
        });
    });
    
    // Register the prefixed routes
    app.register(courseRoutes, {prefix: '/c'});
    app.register(roomRoutes, {prefix: '/r'});
    app.register(searchRoutes, {prefix: '/search'});
    
    done();
}

export {routes};
