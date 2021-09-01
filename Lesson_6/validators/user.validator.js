const Joi = require('joi');

const { CONSTANTS: { CURRENT_YEAR, PASSWORD_REGEXP, EMAIL_REGEXP }, USER_ROLES } = require('../config');

const carValidator = Joi.object({
    brand: Joi.string().alphanum(),
    model: Joi.string().alphanum(),
    year: Joi.number().integer(),
    price: Joi.number()
});

const createUserValidator = Joi.object( {
    born_year: Joi.number().min(CURRENT_YEAR-120).max(CURRENT_YEAR-18).integer().required(),
    email: Joi.string().regex(EMAIL_REGEXP),
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(PASSWORD_REGEXP).required(),
    role: Joi.string().allow(...Object.values(USER_ROLES)),
    work: Joi.boolean(),

    car: Joi.array().
        items(carValidator).
        when('work',{ is: true, then: Joi.required() } )
});
module.exports = {
    createUserValidator
};
