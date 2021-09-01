const { ErrorHandler } = require('../errors');
const { ERROR_MESSAGE, STATUS_CODES } = require('../constants');
const { passwordService } = require('../services');

module.exports = {
    checkUserPassword: async (req, res, next) => {
        try {
            const { password } = req.body;

            const comparedPass = await passwordService.compare(password, req.user.password);

            if (!comparedPass) {
                throw new ErrorHandler(STATUS_CODES.NOT_FOUND, ERROR_MESSAGE.WRONG_EMAIL_OR_PASSWORD);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
