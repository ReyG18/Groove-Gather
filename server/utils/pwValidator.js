// Imports the npm package password-validator.
const PasswordValidator = require('password-validator');

// Create a schema
const pwSchema = new PasswordValidator();

// Add properties to it
pwSchema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(1)                                // Must have at least 1 digit
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// Validate against a password string
console.log(pwSchema.validate('validPASS123'));
// => true
console.log(pwSchema.validate('invalidPASS'));
// => false

// Get a full list of rules which failed
console.log(pwSchema.validate('joke', { list: true }));
// => [ 'min', 'uppercase', 'digits' ]
module.exports = pwSchema;


// From https://www.npmjs.com/package/password-validator/v/5.1.2