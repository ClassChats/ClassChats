// Plugins that block certain users from doing certain things
import fastify = require('fastify');
import fp = require('fastify-plugin');

/**
 * Require that the logged in user have admin rights. Otherwise, display an error.
 */
export const requireAdmin = fp(function(fastify: fastify.FastifyInstance, opts, done) {
    fastify.addHook('onRequest', (request, reply, done) => {
        if (false) {
            ;
        } else {
            reply.code(403).send();
        }
        done();
    });
    
    done();
});
