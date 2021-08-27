const router = require('express').Router();

const { userMiddleware } = require('../middlewares');
const { userController } = require('../controllers');

router.get('/', userController.getAllUsers);

router.post('/',
    userMiddleware.checkEmailUnique,
    userMiddleware.checkEmailValid,
    userMiddleware.checkIsAgeValid,
    userMiddleware.checkNameValid,
    userMiddleware.checkPasswordValid,
    userController.createUser);

router.get('/:user_id', userMiddleware.checkIdValid, userController.getOneUser);

router.delete('/:user_id', userMiddleware.checkIdValid, userController.deleteUser);

module.exports = router;
