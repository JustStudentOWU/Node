const ErrorHandler = require('../errors/ErrorHandler.js');
const { userService } = require('../services');
const { ERROR_MESSAGE, STATUS_CODES } = require('../constants');

module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const { age, email, name, password } = req.body;

            if (age < 0 || !Number.isInteger(age) || age.isNaN || !age) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGE.INCORRECT_AGE);
            }

            if (!email || !password) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGE.WRONG_EMAIL_OR_PASSWORD);
            }

            if (!name) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGE.EMPTY_NAME);
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

    checkIdValid: async (req, res, next) => {
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
    },

    checkUserValid: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await userService.findUserByEmail({ email });

            if (!user) {
                throw new ErrorHandler(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED_ACCESS);
            }

            if (user.password !== password) {
                throw new ErrorHandler(STATUS_CODES.NOT_FOUND, ERROR_MESSAGE.WRONG_EMAIL_OR_PASSWORD);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
