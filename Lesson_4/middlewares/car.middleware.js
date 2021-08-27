const ErrorHandler = require('../errors/ErrorHandler.js');
const { carService } = require('../services');

module.exports = {
    checkIdValid: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await carService.carById(car_id);

            if (!car) {
                throw new ErrorHandler(404, 'car not found');
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsYearValid: (req, res, next) => {
        try {
            const { year } = req.body;

            if (!year || !Number.isInteger(year) || year.isNaN || (year < 1885 || year > 1980)) {
                throw new ErrorHandler(400, 'incorrect year');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsPriceValid: (req, res, next) => {
        try {
            const { price } = req.body;

            if (!price || price < 0) {
                throw new ErrorHandler(400, 'incorrect price');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsBrandUnique: async (req, res, next) => {
        try {
            const { brand } = req.body;
            const brandUnique = await carService.findCar({brand});

            if (brandUnique) {
                throw new ErrorHandler(409, 'brand is already exists');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsModelValid: (req, res, next) => {
        try {
            const { model } = req.body;

            if (!model) {
                throw new ErrorHandler(400, 'incorrect model' );
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
