const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');

const { ERROR_MESSAGE, STATUS_CODES } = require('../constants');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hash) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(STATUS_CODES.NOT_FOUND, ERROR_MESSAGE.WRONG_EMAIL_OR_PASSWORD);
        }

        return isPasswordMatched;
    }
};
