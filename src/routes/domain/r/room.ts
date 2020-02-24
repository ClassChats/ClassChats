// Define the routes for rooms. This is accessed via /:domain/r/:building/:roomNumber

async function routes(app, opts, done) {
    app.get('/:building/:roomNumber', async (request, reply) => {
        return {
            type: 'room',
            building: request.params.building,
            roomNumber: request.params.roomNumber,
            domain: request.params.domain,
        };
    });

    done();
}

export = routes;
