import { Op } from 'sequelize';
import { ServerResponse } from 'http';

import type { FastifyInstance } from './types';
import type {
    GoodResponse,
    BadResponse,
    CollectionResponse,
    ResourceResponse,
} from './types/responses';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { ResponseGroup } from './types/routes';

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

// Responses that are reused throughout the file
const RESPONSES: ResponseGroup = {
    good: {},
    bad: {
        noUniversityForID: {
            ok: false,
            reason: 'No university exists with that ID',
        },
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
): Promise<BadResponse | void> {
    if (!(request.body.name && request.body.domain)) {
        reply.status(400);
        return {
            ok: false,
            reason: "Missing required property 'name' or 'domain'",
        };
    }
}

/**
 * Calls `.split()` on the given string with the given delimiter, and returns the result stripped of
 * any empty strings.
 */
function splitNonempty(str: string, delim: string, limit?: number) {
    const temp = str.split(delim, limit);
    return temp.filter((val) => {
        return val !== '';
    });
}

// Routes
export default async function routes(fastify: FastifyInstance, options): Promise<void> {
    // Get universities and return them as an array of `UniversityResult` objects.
    fastify.route({
        method: 'GET',
        url: '/',
        schema: {
            querystring: SCHEMAS.querystring,
        },
        handler: async (request, reply): Promise<CollectionResponse<UniversityResult>> => {
            // Process the query string
            const where: {
                [key: string]: { [key: string]: Array<string> };
            } = {}; // WHERE clause for the query
            if (request.query.name) {
                const terms = splitNonempty(request.query.name, ',');
                if (terms.length > 0) {
                    where.name = {
                        [Op.in]: terms,
                    };
                }
            }
            if (request.query.domain) {
                const terms = splitNonempty(request.query.domain, ',');
                if (terms.length > 0) {
                    where.domain = {
                        [Op.in]: terms,
                    };
                }
            }

            // Make the query
            const dbUniversities = await fastify.db.models.University.findAll({
                where: where,
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

    // Create a university and return it.
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: SCHEMAS.body,
        },
        preValidation: validateBody,
        handler: async (request, reply): Promise<ResourceResponse<UniversityResult>> => {
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

    // Register the `/:universityID` routes
    fastify.register(
        async function (fastify: FastifyInstance, options) {
            // Get a university by its ID and return it as a `UniversityResult` object.
            fastify.route({
                method: 'GET',
                url: '/',
                handler: async (
                    request,
                    reply,
                ): Promise<BadResponse | ResourceResponse<UniversityResult>> => {
                    const university = await fastify.db.models.University.findByPk(
                        request.params.universityID,
                    );
                    if (university === null) {
                        reply.status(404);
                        return RESPONSES.bad.noUniversityForID;
                    }

                    return {
                        ok: true,
                        result: new UniversityResult(university),
                    };
                },
            });

            // Update a university by its ID.
            fastify.route({
                method: 'PUT',
                url: '/',
                schema: {
                    body: SCHEMAS.body,
                },
                preValidation: validateBody,
                handler: async (
                    request,
                    reply,
                ): Promise<BadResponse | ResourceResponse<UniversityResult>> => {
                    let university = await fastify.db.models.University.findByPk(
                        request.params.universityID,
                    );
                    if (university === null) {
                        reply.status(404);
                        return RESPONSES.bad.noUniversityForID;
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
                url: '/',
                handler: async (request, reply): Promise<BadResponse | GoodResponse> => {
                    const university = await fastify.db.models.University.findByPk(
                        request.params.universityID,
                    );
                    if (university === null) {
                        reply.status(404);
                        return RESPONSES.bad.noUniversityForID;
                    }

                    await university.destroy();

                    return {
                        ok: true,
                    };
                },
            });
        },
        {
            prefix: '/:universityID',
        },
    );
}
