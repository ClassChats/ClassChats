import { Op } from 'sequelize';
import { ServerResponse } from 'http';

import type { FastifyInstance, GoodReply, Reply, BadReply } from './types';
import type { Model } from 'sequelize';
import type { FastifyRequest, FastifyReply } from 'fastify';

// Types
class UniversityResult {
    id: number;
    name: string;
    domain: string;

    /**
     * Creates a `UniversityResult` from a university `Model`.
     */
    constructor(university: Model) {
        this.id = university.id;
        this.name = university.name;
        this.domain = university.domain;
    }
}

// Constants
const SCHEMAS = {
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
    querystring: {
        name: {
            type: 'string',
        },
        domain: {
            type: 'string',
        },
    },
};

const MESSAGES: { [key: string]: Reply } = {
    noUniversityForID: {
        ok: false,
        reason: 'No university exists with that ID',
    },
};

// Helper functions
/**
 * A reusable helper function that can be used as a value to `preValidation`. Checks that the body has
 * non-empty `name` and `domain` properties.
 */
async function validateBody(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>,
): Promise<BadReply | undefined> {
    if (!(request.body.name && request.body.domain)) {
        reply.status(400);
        return {
            ok: false,
            reason: "Missing required property 'name' or 'domain'",
        };
    }
}

// Routes
async function routes(fastify: FastifyInstance, options) {
    // Get universities and return them as an array of `UniversityResult` objects.
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            querystring: SCHEMAS.querystring,
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
                universities.push(new UniversityResult(dbUniversity));
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
            const university = await fastify.db.models.University.findByPk(
                request.params.universityID,
            );
            if (university === null) {
                reply.status(404);
                return MESSAGES.noUniversityForID;
            }

            return {
                ok: true,
                result: new UniversityResult(university),
            };
        },
    });

    // Create a university and return it.
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: SCHEMAS.body,
        },
        preValidation: validateBody,
        handler: async (request, reply): Promise<GoodReply> => {
            const university = await fastify.db.models.University.create({
                name: request.body.name,
                domain: request.body.domain,
            });

            reply.status(201);
            return {
                ok: true,
                result: new UniversityResult(university),
            };
        },
    });

    // Update a university by its ID.
    fastify.route({
        method: 'PUT',
        url: '/:universityID',
        schema: {
            body: SCHEMAS.body,
        },
        preValidation: validateBody,
        handler: async (request, reply): Promise<Reply> => {
            let university = await fastify.db.models.University.findByPk(
                request.params.universityID,
            );
            if (university === null) {
                reply.status(404);
                return MESSAGES.noUniversityForID;
            }

            university = await university.update({
                name: request.body.name,
                domain: request.body.domain,
            });

            return {
                ok: true,
                result: new UniversityResult(university),
            };
        },
    });

    // Delete a university by its ID.
    fastify.route({
        method: 'DELETE',
        url: '/:universityID',
        handler: async (request, reply): Promise<Reply> => {
            const university = await fastify.db.models.University.findByPk(
                request.params.universityID,
            );
            if (university === null) {
                reply.status(404);
                return MESSAGES.noUniversityForID;
            }

            await university.destroy();

            return {
                ok: true,
            };
        },
    });
}

export = routes;
