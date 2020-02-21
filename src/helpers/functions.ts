export function isValidEmail(email){
    var pattern = /^.+@.+\.edu$/i;
    return email.match(pattern) !== null;    
}
