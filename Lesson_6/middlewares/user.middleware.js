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
            const userByEmail = await userService.findOneUser({ email });

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

    getUserByDynamicParam: (paramName, searchIn, dbFiled = paramName) => async (req, res, next) => {
        try {
            const field = req[searchIn][paramName];

            const user = await userService.findOneUser({ [dbFiled]: field });

            if (!user) {
                throw new ErrorHandler(STATUS_CODES.NOT_FOUND, ERROR_MESSAGE.NOT_FOUND);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (rolesArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!rolesArr.length) {
                return next();
            }

            if (!rolesArr.includes(role)) {
                throw new ErrorHandler(STATUS_CODES.FORBIDDEN, ERROR_MESSAGE.ACCESS_DENIED);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
