module.exports = {
    authUser: (req, res, next) => {
        try {
            res.json(`Hello ${req.user.name}`);
        } catch (e) {
            next(e);
        }
    }
};
