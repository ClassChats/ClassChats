/**
 * Contains types that define JSON responses from the API. They should be used as the return types
 * for async Fastify.route() validation and handler functions to ensure type safety for the API.
 */

/**
 * A generic response that indicates failure.
 */
export interface BadResponse {
    ok: false;
    reason?: string;
}

/**
 * A generic response that indicates success.
 */
export interface GoodResponse {
    ok: true;
    result?: unknown;
}

/**
 * A `GoodResponse` for collections of resources.
 */
export interface CollectionResponse<ResourceType> extends GoodResponse {
    ok: true;
    result: ResourceType[];
}

/**
 * A `GoodResponse` for single resources.
 */
export interface ResourceResponse<ResourceType> extends GoodResponse {
    ok: true;
    result: ResourceType;
}
