const { getCarsMom } = require('../mom/getCars.mom')
const { getCarsFaraday } = require('../faraday/getCars.faraday')

const getCarsFromMom = async (carTypeName, numberOfSeats) => {
    try {
        return await getCarsMom(carTypeName, numberOfSeats)
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}

const getCarsFromFaraday = async (carTypeName, numberOfSeats) => {
    try {
        return await getCarsFaraday(carTypeName, numberOfSeats)
    } catch (err) {
        console.log(err);
        return { error: err.message }
    }
}

const getCars = async (carTypeName, numberOfSeats) => {
    try {

        let carsFaraday = await getCarsFromFaraday(carTypeName, numberOfSeats)
        let carsMom = await getCarsFromMom(carTypeName, numberOfSeats)

        carsFaraday = carsFaraday.map(car => {
            car = car.carType
            car["origin"] = "faraday";
            car["car_type_name"] = c.name;
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

module.exports = {
    getCars
}