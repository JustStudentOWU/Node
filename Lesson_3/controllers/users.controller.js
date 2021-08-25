const { showUsers, userById, createUser } = require('../services/users.services');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await showUsers();

        res.json(users);
    },
    getOneUser: async (req, res) => {
        const { user_id } = req.params;
        const user = await userById(user_id);

        if (!user){
            res.status(404).json('user not found');

            return;
        }

        res.json(user);
    },
    createUser: async (req, res) => {
        const { email, password } = req.body;
        const authUser = { email, password };

        const users = await showUsers();

        if (!email || !password){
            res.status(404).json('no email or password');

            return;
        }

        if (users.find(user => user.email === email)){
            res.status(404).json('user is already exists');

            return;
        }

        await createUser(authUser);

        res.status(200).json('user created');
    }
};
