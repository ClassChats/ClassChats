// Define the routes for courses. This is accessed via /:domain/c/:department/:courseNumber

async function routes(app, opts, done) {
    app.get('/:subject/:courseNumber', async (request, reply) => {
        return {
            type: 'course',
            subject: request.params.subject,
            courseNumber: request.params.courseNumber,
            domain: request.params.domain,
        };
    });
    
    done();
}

export = routes;
