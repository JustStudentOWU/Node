const router = require('express').Router();

const { userMiddleware } = require('../middlewares');
const { userController } = require('../controllers');

router.get('/', userController.getAllUsers);

router.post('/',
    userMiddleware.isUserValid,
    userMiddleware.checkEmailUnique,
    userController.createUser);

router.get('/:user_id',
    userMiddleware.checkIdValid,
    userMiddleware.checkUserExist,
    userController.getOneUser);

router.delete('/:user_id', userMiddleware.checkIdValid,
    userController.deleteUser);

module.exports = router;
