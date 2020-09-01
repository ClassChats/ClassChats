import { FastifyInstance, GoodReply, Reply, BadReply } from './types';
import { Op } from 'sequelize';

// Types
interface UniversityResult {
    id: number;
    name: string;
    domain: string;
}

// Routes
async function routes(fastify: FastifyInstance, options) {
    // Get universities and return them as an array of `UniversityResult` objects.
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            querystring: {
                name: {
                    type: 'string',
                },
                domain: {
                    type: 'string',
                },
            },
        },
        handler: async (request, reply): Promise<GoodReply> => {
            // WHERE clause for the query
            const where = {};
            if (request.query.name) {
                where.name = {
                    [Op.eq]: request.query.name,
                };
            }
            if (request.query.domain) {
                where.domain = {
                    [Op.eq]: request.query.domain,
                };
            }

            // Make the query
            const dbUniversities = await fastify.db.models.University.findAll({
                where,
            });

            // Format the results
            const universities: UniversityResult[] = []; // The result
            for (const dbUniversity of dbUniversities) {
                universities.push({
                    id: dbUniversity.id,
                    name: dbUniversity.name,
                    domain: dbUniversity.domain,
                });
            }

            return {
                ok: true,
                result: universities,
            };
        },
    });

    // Get a university by its ID and return it as a `UniversityResult` object.
    fastify.route({
        method: 'GET',
        url: '/:universityID',
        handler: async (request, reply): Promise<Reply> => {
            const dbUniversity = await fastify.db.models.University.findByPk(
                request.params.universityID,
            );
            if (dbUniversity === null) {
                reply.status(404);
                return {
                    ok: false,
                    reason: 'No university exists with that ID.',
                };
            }

            // Format the results
            const university: UniversityResult = {
                id: dbUniversity.id,
                name: dbUniversity.name,
                domain: dbUniversity.domain,
            };

            return {
                ok: true,
                result: university,
            };
        },
    });

    // Create a university and return it.
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: {
                properties: {
                    name: {
                        type: 'string',
                    },
                    domain: {
                        type: 'string',
                    },
                },
                required: ['name', 'domain'],
            },
        },
        preValidation: async (request, reply) => {
            if (!(request.body.name && request.body.domain)) {
                const message: BadReply = {
                    ok: false,
                    reason: "Missing required property 'name' or 'domain'",
                };
                reply.status(400).send(message);
            }
        },
        handler: async (request, reply): Promise<GoodReply> => {
            const dbUniversity = await fastify.db.models.University.create({
                name: request.body.name,
                domain: request.body.domain,
            });

            const university: UniversityResult = {
                id: dbUniversity.id,
                name: dbUniversity.name,
                domain: dbUniversity.domain,
            };

            return {
                ok: true,
                result: university,
            };
        },
    });

    // Delete a university by its ID.
    fastify.route({
        method: 'DELETE',
        url: '/:universityID',
        handler: async (request, reply): Promise<Reply> => {
            const dbUniversity = await fastify.db.models.University.findByPk(
                request.params.universityID,
            );
            if (dbUniversity === null) {
                reply.status(404);
                return {
                    ok: false,
                    reason: 'No university exists with that ID.',
                };
            }

            dbUniversity.destroy();

            return {
                ok: true,
            };
        },
    });
}

export = routes;
