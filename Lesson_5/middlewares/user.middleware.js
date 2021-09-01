const { ErrorHandler } = require('../errors');
const { ERROR_MESSAGE, STATUS_CODES } = require('../constants');
const { userService } = require('../services');
const { idValidator, userValidator } = require('../validators');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(STATUS_CODES.NOT_FOUND, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkEmailUnique: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userByEmail = await userService.findUserByEmail({ email });

            if (userByEmail) {
                throw new ErrorHandler(STATUS_CODES.CONFLICT, ERROR_MESSAGE.EXIST_USER);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIdValid: (req, res, next) => {
        try {
            const { error } = idValidator.idValidator.validate();

            if (error) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await userService.userById(user_id);

            if (!user) {
                throw new ErrorHandler(STATUS_CODES.NOT_FOUND, ERROR_MESSAGE.USER_NOT_FOUND);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
