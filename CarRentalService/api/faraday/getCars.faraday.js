const fetch = require('node-fetch')

async function getCarsFaraday(type, numberOfSeats) {
    let URL = "http://167.172.98.125:4002/Faraday_API/api/cars"
    if (type && numberOfSeats)
        URL += `?type=${type}&seat${numberOfSeats}`;
    else if (type)
        URL += `?type=${type}`;
    else if (numberOfSeats)
        URL += `?seat=${numberOfSeats}`;
    let cars = await fetch(URL).then(res => {
        return res.json();
    });
    return cars;
}

module.exports = {
    getCarsFaraday
}

