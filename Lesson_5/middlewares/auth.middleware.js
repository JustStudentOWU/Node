const { ErrorHandler } = require('../errors');
const { ERROR_MESSAGE, STATUS_CODES } = require('../constants');
const { userService, passwordService } = require('../services');

module.exports = {
    checkUserAuth: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await userService.findUserByEmail({ email });
            const comparedPass = await passwordService.compare(password, user.password);
            if (!user) {
                throw new ErrorHandler(STATUS_CODES.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED_ACCESS);
            }

            if (!comparedPass) {
                throw new ErrorHandler(STATUS_CODES.NOT_FOUND, ERROR_MESSAGE.WRONG_EMAIL_OR_PASSWORD);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
