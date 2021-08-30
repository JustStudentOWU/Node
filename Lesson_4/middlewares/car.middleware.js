const { ERROR_MESSAGE, STATUS_CODES} = require('../constants');
const ErrorHandler = require('../errors/ErrorHandler.js');
const { carService } = require('../services');

module.exports = {
    checkIdValid: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await carService.carById(car_id);

            if (!car) {
                throw new ErrorHandler(STATUS_CODES.NOT_FOUND, ERROR_MESSAGE.CAR_NOT_FOUND);
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarValid: (req, res, next) => {
        try {
            const { model, price, year } = req.body;

            if (!year || !Number.isInteger(year) || year.isNaN || (year < 1885 || year > 1980)) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGE.INCORRECT_YEAR);
            }

            if (!price || price < 0) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGE.INCORRECT_PRICE);
            }

            if (!model) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, ERROR_MESSAGE.INCORRECT_MODEL);
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
                throw new ErrorHandler(STATUS_CODES.CONFLICT, ERROR_MESSAGE.EXIST_CAR);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
