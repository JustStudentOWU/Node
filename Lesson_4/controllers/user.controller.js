const { ERROR_MESSAGE, STATUS_CODES } = require('../constants');
const { userService } = require('../services');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.showUsers();

            res.json(users);
        } catch (e) {
            next();
        }
    },

    getOneUser: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            await userService.createUser(req.body);

            res.status(STATUS_CODES).json(ERROR_MESSAGE.USER_CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await userService.deleteUser(user_id);

            res.status(STATUS_CODES.DELETE).json(ERROR_MESSAGE.CAR_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
