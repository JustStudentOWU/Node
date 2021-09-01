const Joi = require('joi');

const idValidator = Joi.object({
    user_id: Joi.string().alphanum().min(24).max(24)
});

module.exports = {
    idValidator
};
