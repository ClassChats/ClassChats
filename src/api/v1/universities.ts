import { FastifyInstance, GoodReply } from './types';
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
        handler: async (request, reply): Promise<GoodReply> => {
            const dbUniversity = await fastify.db.models.University.findByPk(
                request.params.universityID,
            );

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

    fastify.put(
        '/',
        {
            schema: {
                body: {
                    name: 'string',
                    domain: 'string',
                },
            },
        },
        async (request, reply) => {
            const universities = await fastify.db.models.University.create({
                name: request.body.name,
                domain: request.body.domain,
            });
            return universities;
        },
    );
}

export = routes;
