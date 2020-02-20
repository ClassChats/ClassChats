// Define the routes for domains. This is accessed via /:domain

async function routes(app, opts, done) {
    app.get('/', async (request, reply) => {
        return {
            type: 'domain',
            domain: request.params.domain,
        };
    });
    
    // Register the prefixed routes
    app.register(require('./verify/verify'), {prefix: '/verify'});
    app.register(require('./c/course'), {prefix: '/c'});
    app.register(require('./r/room'), {prefix: '/r'});
    app.register(require('./add/add'), {prefix: '/add'});
    app.register(require('./search/search'), {prefix: '/search'});
    
    done();
}

export = routes;
