const { Car } = require('../dataBase');

module.exports = {
    carById: (userId) => Car.findById(userId),
    createCar: (car) => Car.create(car),
    deleteCar: (userId) => Car.deleteOne({ _id: userId }),
    findCar: (brand) => Car.findOne(brand),
    showCars: () => Car.find()
};
