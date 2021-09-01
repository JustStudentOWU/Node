const Joi = require('joi');
const { CONSTANTS } = require('../config');

module.exports = Joi.object({
    email: Joi.string().regex(CONSTANTS.EMAIL_REGEXP).required(),
    password: Joi.string().regex(CONSTANTS.PASSWORD_REGEXP).required()
});
