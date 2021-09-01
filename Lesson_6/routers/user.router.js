const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get(
    '/',
    userController.getAllUsers
);

router.post(
    '/',
    userMiddleware.isUserValid,
    userMiddleware.checkEmailUnique,
    userController.createUser
);

router.get(
    '/:user_id',
    userMiddleware.checkIdValid,
    userMiddleware.getUserByDynamicParam('user_id','params', '_id'),
    userMiddleware.checkUserRole(['admin', 'user']),
    userController.getOneUser
);

router.delete(
    '/:user_id',
    userMiddleware.checkIdValid,
    userMiddleware.getUserByDynamicParam('user_id','params', '_id'),
    userMiddleware.checkUserRole(['admin']),
    userController.deleteUser
);

module.exports = router;
