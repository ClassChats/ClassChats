// Define the routes for rooms. This is accessed via /:domain/r/:building/:roomNumber
async function routes(app, opts, done) {
    app.get('/:building/:roomNumber', async (request, reply) => {
        reply.send({
            type: 'room',
            building: request.params.building,
            roomNumber: request.params.roomNumber,
            domain: request.params.domain,
        });
    });
    
    done();
}

export {routes};
