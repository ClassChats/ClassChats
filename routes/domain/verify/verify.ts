// Define the routes for validation. This is accessed via /:domain/verify

async function routes(app, opts, done) {
    app.get('/', async (request, reply) => {
        return {
            type: 'verify',
            domain: request.params.domain,
        };
    });
    
    done();
}

module.exports = routes;
