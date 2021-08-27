const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.post('/',
    userMiddleware.checkPasswordValid,
    userMiddleware.checkEmailValid,
    userMiddleware.checkUserValid,
    authController.authUser);

module.exports = router;
