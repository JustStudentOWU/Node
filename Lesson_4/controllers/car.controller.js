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

            res.status(201).json('car created');
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            await carService.deleteCar(car_id);

            res.status(204).json('success deleted');
        } catch (e) {
            next(e);
        }
    }
};
