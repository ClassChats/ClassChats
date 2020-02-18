// Define the routes for validation. This is accessed via /:domain/validate
async function routes(app, opts, done) {
    app.get('/', async (request, reply) => {
        reply.send({
            type: 'validate',
            domain: request.params.domain,
        });
    });
    
    done();
}

export {routes};
