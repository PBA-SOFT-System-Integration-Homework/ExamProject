const carsDB = require('../../db/carsDB');
const { shuffle } = require("../../utils/helperMethods")

// ADD LOGIC HERE THEN CALL DB,

/**
 * Register user to database
 */
const getCars = async (amountOfPeople) => {
    try {
        let cars = await carsDB.getCarsFromMiniproject();
        cars = shuffle(cars)
        
        let carsToBook = []
        let currentAvailableSeats = 0
        for(let i = 0; i < cars.length; i++) {
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
        return { error: err.message }
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

/**
 * 
 */


module.exports = {
    getCars,
    bookCars
}