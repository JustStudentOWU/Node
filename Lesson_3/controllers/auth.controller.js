const { authServices: { findAuthUser } } = require('../services');

module.exports = {
    authUser: async (req, res) => {
        const { email, password } = req.body;
        const user = await findAuthUser(email, password);

        if (user === -1){
            res.status(400).json('wrong email or password');

            return;
        }

        res.status(200).json('you are login');
    }
};
