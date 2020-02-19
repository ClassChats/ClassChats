// Define the routes for the admin interface. This is accessed via /admin

async function routes(app, opts, done) {
    app.get('/', async (request, reply) => {
        return {
            type: 'admin',
        };
    });
    
    done();
}

module.exports = routes;
