// Define the top-level routes.

async function routes(app, opts, done) {
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
    
    done();
}

export = routes;
