import { FastifyInstance, GoodReply, Reply, BadReply } from './types';
import { Op, Model } from 'sequelize';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

// Types
class ChatResult {
    id: number;
    link: string;

    /**
     * Creates a `ChatResult` from a Chat `Model`.
     */
    constructor(Chat: Model) {
        this.id = Chat.id;
        this.link = Chat.link;
    }
}

// Constants
const SCHEMAS = {
    body: {
        properties: {
            link: {
                type: 'string',
            },
            courseID: {
                type: 'integer',
            },
            sectionID: {
                type: 'integer'
            }
        },
        required: ['link', 'courseID'],
    },
    querystring: {
        link: {
            type: 'string',
        },
        courseID: {
            type: 'integer',
        },
    },
};

const MESSAGES: { [key: string]: Reply } = {
    noChatForID: {
        ok: false,
        reason: 'No chat exists with that ID',
    }
    regexFail: {
        ok: false,
        reason: 'Could not validate link',
    },
    noSuchCourse: {
        ok: false,
        reason: 'Could not attach the link to a course'
    },
    noSuchSection: {
        ok: false,
        reason: 'Could not attach the link to a section'
    }
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
    if (!(request.body.link && request.body.courseID)) {
        reply.status(400);
        return {
            ok: false,
            reason: "Missing required property 'link' or 'courseID'",
        };
    }
}

// Routes
async function routes(fastify: FastifyInstance, options) {

    // Get a chat by its ID and return it as a `ChatResult` object.
    fastify.route({
        method: 'GET',
        url: '/:chatID',
        handler: async (request, reply): Promise<Reply> => {
            const chat = await fastify.db.models.Chat.findByPk(
                request.params.ChatID,
            );
            if (chat === null) {
                reply.status(404);
                return MESSAGES.noChatForID;
            }

            return {
                ok: true,
                result: new ChatResult(chat),
            };
        },
    });

    // Create a chat and return it.
    fastify.route({
        method: 'POST',
        url: '/',
        schema: {
            body: SCHEMAS.body,
        },
        preValidation: validateBody,
        handler: async (request, reply): Promise<GoodReply> => {
            const chat = await fastify.db.models.Chat.create({
                link: request.body.link,
                courseID: request.body.courseID,
                sectionID: request.body.sectionID,
            });

            reply.status(201);
            return {
                ok: true,
                result: new ChatResult(chat),
            };
        },
    });

    // Update a chat by its ID.
    fastify.route({
        method: 'PUT',
        url: '/:chatID',
        schema: {
            body: SCHEMAS.body,
        },
        preValidation: validateBody,
        handler: async (request, reply): Promise<Reply> => {
            let chat = await fastify.db.models.Chat.findByPk(
                request.params.chatID,
            );
            if (chat === null) {
                reply.status(404);
                return MESSAGES.noChatForID;
            }

            chat = await chat.update({
                link: request.body.link,
            });

            return {
                ok: true,
                result: new ChatResult(chat),
            };
        },
    });

    // Delete a chat by its ID.
    fastify.route({
        method: 'DELETE',
        url: '/:chatID',
        handler: async (request, reply): Promise<Reply> => {
            const chat = await fastify.db.models.Chat.findByPk(
                request.params.chatID,
            );
            if (chat === null) {
                reply.status(404);
                return MESSAGES.noChatForID;
            }

            await chat.destroy();

            return {
                ok: true,
            };
        },
    });
}

export = routes;