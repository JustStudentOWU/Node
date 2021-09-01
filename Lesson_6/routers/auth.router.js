const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post(
    '/',
    userMiddleware.getUserByDynamicParam('email', 'body'),
    authMiddleware.checkUserPassword,
    authController.authUser
);

module.exports = router;
