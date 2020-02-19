// Define the routes for rooms. This is accessed via /:domain/r/:building/:roomNumber
async function routes(app, opts, done) {
    app.get('/', async (request, reply) => {
        return {
            type: 'search',
            domain: request.params.domain,
        };
    });
    
    done();
}

export {routes};
