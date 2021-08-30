const { ERROR_MESSAGE, STATUS_CODES } = require('../constants');
const { carService } = require('../services');

module.exports = {
    getCars: async (req, res, next) => {
        try {
            const cars = await carService.showCars();

            res.json(cars);
        } catch (e) {
            next();
        }
    },

    getCar: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            await carService.createCar(req.body);

            res.status(STATUS_CODES.CREATED).json(ERROR_MESSAGE.CAR_CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            await carService.deleteCar(car_id);

            res.status(STATUS_CODES.DELETE).json(ERROR_MESSAGE.CAR_DELETED);
        } catch (e) {
            next(e);
        }
    }
};
