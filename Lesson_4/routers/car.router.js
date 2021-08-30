const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get('/', carController.getCars);

router.get('/:car_id', carMiddleware.checkIdValid, carController.getCar);

router.post('/',
    carMiddleware.isCarValid,
    carMiddleware.checkIsBrandUnique,
    carController.createCar);

router.delete('/:car_id', carMiddleware.checkIdValid, carController.deleteCar);

module.exports = router;
