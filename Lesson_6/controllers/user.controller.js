const { ERROR_MESSAGE, STATUS_CODES } = require('../constants');
const { userService, passwordService } = require('../services');
const { userUtil: { userNormalizer } } = require('../utils');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.showUsers().lean();
            const usersNormalize = [];

            users.forEach(user => usersNormalize.push(userNormalizer(user)));

            res.json(usersNormalize);
        } catch (e) {
            next();
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashedPassword = await passwordService.hash(password);

            await userService.createUser({ ...req.body, password: hashedPassword });

            res.status(STATUS_CODES.CREATED).json(ERROR_MESSAGE.USER_CREATED);
        } catch (e) {
            next(e);
        }
    },

    getOneUser: (req, res, next) => {
        try {
            const user = req.user.toObject();
            const userNormalize = userNormalizer(user);

            res.json(userNormalize);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await userService.deleteUser(user_id);

            res.status(STATUS_CODES.DELETE).json(ERROR_MESSAGE.USER_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
