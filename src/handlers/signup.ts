/**
 * When someone POSTs to /signup, we must:
 * - Check that they have a .edu email WITH REGEX!!!!
 *  - /.+@.+\.edu/
 * - Create a new User with password (hashed) + salt
 * - Generate a random string verifyCode of characters up to length n
 * - Create a new Email with userID, email address, verified:false, verifyCode
 * - Send the email to the user
 */

import * as bcrypt from 'bcrypt';
import * as fastify from 'fastify';
import * as models from '../models/models';

/**
 * Handle a signup request.
 */
export async function handler(request: fastify.FastifyRequest) {
    const saltRounds = 10;
    const plaintextPassword = request.body.password;

    // Hash the password
    const hash = await bcrypt.hash(plaintextPassword, saltRounds);

    // Create a new User in the DB
    const user = await models.User.create({
        password: hash,
    });

    // Create the associated email entry
    await models.Email.create({
        email: request.body.email,
        verifyCode: makeId(6),
        userId: user.id,
    });
}

/**
 * Create a random alphanumeric case-sensitive string of size `length`.
 */
function makeId(length: number) {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * length));
    }

    return result;
}
