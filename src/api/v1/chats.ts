import { FastifyInstance, Reply, BadReply } from './types';
import { Model, Sequelize } from 'sequelize';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

// Types
class ChatResult {
    id: number;
    link: string;
    platform: string;
    classID: number | null;

    /**
     * Creates a `ChatResult` from a Chat `Model`.
     */
    constructor(Chat: Model) {
        this.id = Chat.id;
        this.link = Chat.link;
        this.platform = Chat.platform.name;
        this.classID = Chat.class.id;
    }
}

// Constants
const SCHEMAS = {
    body: {
        properties: {
            link: {
                type: 'string',
            },
            classID: {
                type: 'integer',
            },
        },
        required: ['link', 'classID'],
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
    },
    noSuchClass: {
        ok: false,
        reason: 'No class exists with that ID',
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
    if (!(request.body.link && request.body.classID)) {
        reply.status(400);
        return {
            ok: false,
            reason: "Missing required property 'link' or 'classID'",
        };
    }
}

/**
 * Determine which platform a link belongs to, and return `null` if it belongs to none of them.
 * TODO Include a section in the admin panel that lists chats with unkown links.
 */
async function determinePlatform(
    db: Sequelize,
    link: string,
): Promise<Model | null> {
    const platforms = await db.models.Platform.findAll();

    for (const platform of platforms) {
        const regex = new RegExp(platform.regex);

        // If the link matches the platform's regular expression, return the platform
        if (regex.test(link)) {
            return platform;
        }
    }

    return null;
}

// Routes
async function routes(fastify: FastifyInstance, options) {
    // TODO add a general GET / route

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
        handler: async (request, reply): Promise<Reply> => {
            // Try to get the given class
            const theClass = await fastify.db.models.Class.findByPk(
                request.params.classID,
            );
            if (theClass == null) {
                reply.status(400);
                return MESSAGES.noSuchClass;
            }

            // Determine the platform
            const platform = determinePlatform(fastify.db, request.params.link);

            // Create the chat
            const chat = await fastify.db.models.Chat.create({
                link: request.body.link,
                class: theClass,
                platform: platform,
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

            // Try to get the given class
            const theClass = await fastify.db.models.Class.findByPk(
                request.params.classID,
            );
            if (theClass == null) {
                reply.status(400);
                return MESSAGES.noSuchClass;
            }

            // Determine the platform
            const platform = determinePlatform(fastify.db, request.params.link);

            // Update the chat
            chat = await chat.update({
                link: request.body.link,
                class: theClass,
                platform: platform,
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
