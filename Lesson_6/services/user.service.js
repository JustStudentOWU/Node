const { User } = require('../dataBase');

module.exports = {
    createUser: (user) => User.create(user),

    deleteUser: (userId) => User.deleteOne({ _id: userId }),

    findOneUser: (field) => User.findOne(field),

    showUsers: () => User.find()
};
