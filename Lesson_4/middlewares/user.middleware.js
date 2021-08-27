const ErrorHandler = require('../errors/ErrorHandler.js');
const { userService } = require('../services');

module.exports = {
    checkNameValid: (req, res, next) => {
        try {
            const { name } = req.body;

            if (!name) {
                throw new ErrorHandler(400, 'no email or password');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkPasswordValid: (req, res, next) => {
        try {
            const { password } = req.body;

            if (!password) {
                throw new ErrorHandler(400, 'no email or password');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkEmailValid: (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email) {
                throw new ErrorHandler(400, 'no email or password');
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
                throw new ErrorHandler(409, 'user is already exists');
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
                throw new ErrorHandler(404, 'user not found');
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsAgeValid: (req, res, next) => {
        try {
            const { age } = req.body;

            if (!age) {
                throw new ErrorHandler(400, 'incorrect age');
            }
            if (age < 0 || !Number.isInteger(age) || age.isNaN) {
                throw new ErrorHandler(400, 'incorrect age');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserValid: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await userService.findUser({ email });

            if (!user || user.password !== password) {
                throw new ErrorHandler(404, `wrong email or password`);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
