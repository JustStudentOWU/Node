module.exports = {
    userNormalizer: (userToNormalize) => {
        const fieldsToRemove = [ 'password', '__v' ];

        fieldsToRemove.forEach(fields => delete userToNormalize[fields]);

        return userToNormalize;
    }
};
