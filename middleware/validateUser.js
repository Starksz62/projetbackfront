const joi = require("joi")
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const userSchema = joi.object ({

    username : joi.string().min(5).max(75).required(),
    password : joiPassword.string().minOfSpecialCharacters(1).minOfUppercase(1).minOfNumeric(2).noWhiteSpaces().onlyLatinCharacters().doesNotInclude(['password']).required().messages({
        'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
        'password.minOfSpecialCharacters':
        '{#label} should contain at least {#min} special character',
        'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
        'password.noWhiteSpaces': '{#label} should not contain white spaces',
        'password.onlyLatinCharacters': '{#label} should contain only latin characters',
        'password.doesNotInclude': '{#label} is too common',
  }),
    mail :joi.string().email({ tlds: { allow: false } }),
})

const validateUser = (req,res,next) => {
    const{
        username,
        password,
        mail
    } = req.body

const { error } = userSchema.validate(req.body);
if (error) {
    return res.status(400).json({ errors: error.details.map(detail => detail.message) });
} else {
    console.log("Data validated successfully:", req.body);
    next();
}
}
module.exports = validateUser;