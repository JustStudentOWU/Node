const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

router.post('/',
    authMiddleware.checkUserAuth,
    authController.authUser);

module.exports = router;
