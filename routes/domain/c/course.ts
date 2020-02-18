// Define the routes for courses. This is accessed via /:domain/c/:department/:courseNumber
async function routes(app, opts, done) {
    app.get('/:subject/:courseNumber', async (request, reply) => {
        reply.send({
            type: 'course',
            subject: request.params.subject,
            courseNumber: request.params.courseNumber,
            domain: request.params.domain,
        });
    });
    
    done();
}

export {routes};
