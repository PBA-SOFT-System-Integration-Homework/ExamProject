const carsDB = require('../../db/carsDB');
const { shuffle } = require("../../utils/helperMethods")

// ADD LOGIC HERE THEN CALL DB,

const getCars = async (amountOfPeople, carType, numberOfSeats) => {
    try {
        let cars = await carsDB.getCarsFromCarRentalService(carType, numberOfSeats);

        cars = shuffle(cars)

        let carsToBook = []
        let currentAvailableSeats = 0
        for (let i = 0; i < cars.length; i++) {
            if (currentAvailableSeats < amountOfPeople) {
                currentAvailableSeats += cars[i].number_of_seats;
                carsToBook.push(cars[i]);
            }
            else
                break;
        }
        return carsToBook;
    } catch (err) {
        console.log(err);
        return { error: "An error occured while getting cars." }
    }
}

const bookCars = async (cars, eventId) => {
    try {
        return await carsDB.bookCars(cars, eventId);
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}

const bookCar = async (carId, userId) => {
    try {
        return await carsDB.bookCar(carId, userId);
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}

const getCarsById = async (eventId) => {
    try {
        return await carsDB.getCarsByEventId(eventId);
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}

module.exports = {
    getCars,
    bookCars,
    bookCar,
    getCarsById
}