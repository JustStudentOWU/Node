const router = require('express').Router();
const { usersController } = require('../controllers');

router.get('/', usersController.getAllUsers);

router.get('/:user_id', usersController.getOneUser);

router.post('/', usersController.createUser);

module.exports = router;
