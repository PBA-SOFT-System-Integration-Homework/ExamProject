const { getCarsMom } = require('../mom/getCars.mom')
const { bookCarsMOM } = require('../mom/bookCars.mom')
const { getCarsFaraday } = require('../faraday/getCars.faraday')


const bookCars = async (cars) => {
    const carsMOM = cars.filter(c => c.origin === 'mom');
    console.log('hello')
    console.log(carsMOM);
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
        if (carsMom.length > 100) carsMom = carsMom.splice(0, 100);

        carsFaraday = carsFaraday.map(car => {
            car = car.carType
            car["origin"] = "faraday";
            car["car_type_name"] = car.name;
            car["number_of_seats"] = car.numberOfSeats // to name it the same as the mom cars

            delete car.name
            delete car.numberOfSeats
            return car;
        })

        carsMom = carsMom.map(car => {
            car["origin"] = "mom";
            return car;
        })

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