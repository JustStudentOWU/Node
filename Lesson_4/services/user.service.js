const { User } = require('../dataBase');

module.exports = {
    createUser: (user) => User.create(user),

    deleteUser: (userId) => User.deleteOne({ _id: userId }),

    findUserByEmail: (email) => User.findOne(email),

    userById: (userId) => User.findById(userId),

    showUsers: () => User.find()
};
