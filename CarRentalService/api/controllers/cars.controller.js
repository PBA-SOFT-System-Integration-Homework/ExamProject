const { getCarsMom } = require('../mom/getCars.mom')
const { bookCarsMOM } = require('../mom/bookCars.mom')
const { getCarsFaraday } = require('../faraday/getCars.faraday')


const bookCars = async (cars) => {
    const carsMOM = cars.filter(c => c.origin === 'mom');
    // const carsFaraday = cars.filter(c => c.origin === 'faraday');
    try {
        bookCarsMOM(carsMOM);
        // bookCarsFaraday(carsFaraday);
    } catch (err) {
        console.log(err);
        return { error: 'An error occured while booking cars' }
    }

}

const getCars = async (carTypeName, numberOfSeats) => {
    try {

        let carsFaraday = await _getCarsFromFaraday(carTypeName, numberOfSeats)
        let carsMom = await _getCarsFromMom(carTypeName, numberOfSeats)
        // We get around 2200 cars if we take all of them or apply a vauge filter, and only need max 100
        if (carsMom.length > 100) carsMom = carsMom.splice(0, 100);

        // Run through the faraday rental cars and adjust their properties to match mom service cars
        carsFaraday = carsFaraday.map(car => {
            car = car.carType
            car["origin"] = "faraday";
            car["car_type_name"] = car.name;
            car["number_of_seats"] = car.numberOfSeats // to name it the same as the mom cars

            delete car.name
            delete car.numberOfSeats
            return car;
        })

        // add origin to mom service cars as well.
        carsMom = carsMom.map(car => {
            car["origin"] = "mom";
            return car;
        })
        // return the concatenated cars
        return carsFaraday.concat(carsMom)
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}

const _getCarsFromMom = async (carTypeName, numberOfSeats) => {
    try {
        return await getCarsMom(carTypeName, numberOfSeats)
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}

const _getCarsFromFaraday = async (carTypeName, numberOfSeats) => {
    try {
        return await getCarsFaraday(carTypeName, numberOfSeats)
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}

module.exports = {
    getCars,
    bookCars
}