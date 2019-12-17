const carsDB = require('../../db/carsDB');
const { shuffle } = require("../../utils/helperMethods")

// ADD LOGIC HERE THEN CALL DB,

const getCars = async (amountOfPeople) => {
    try {
        let cars = await carsDB.getCarsFromMiniproject();
        
     // URL = "amqp://167.172.98.125:5672"

// function createResponseQueue(userInput) {
//     amqp.connect(URL, function (error, connection) {
//         if (error) {
//             throw error;
//         }
//         connection.createChannel(function (error1, channel) {
//             if (error1) throw error1;

//             let response_queue = '';

//             channel.assertQueue('', {
//                 exclusive: true,
//             }, (err, ok) => {
//                 response_queue = ok.queue

//                 channel.sendToQueue('car_list_request', Buffer.from(userInput), {
//                     replyTo: response_queue
//                 });
//                 channel.consume(response_queue, (msg) => {
//                     cars = JSON.parse(msg.content.toString());
//                     channel.ack(msg)
//                 });
//             });
//         });
//     });
// }
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