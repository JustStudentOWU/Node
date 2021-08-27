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

            res.status(201).json('user created');
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await userService.deleteUser(user_id);

            res.status(204).json('success deleted');
        } catch (e) {
            next(e);
        }
    }
};
