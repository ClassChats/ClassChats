/**
 * When someone POSTs to /signup, we must:
 * - Check that they have a .edu email WITH REGEX!!!!
 *  - /.+@.+\.edu/
 * - Create a new User with password (hashed) + salt
 * - Generate a random string verifyCode of characters up to length n 
 * - Create a new Email with userID, email address, verified:false, verifyCode
 * - 
 */

/**
 * makeid(length)
 * generates a random string t
 * 
 */

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

