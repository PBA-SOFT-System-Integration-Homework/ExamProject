var amqp = require('amqplib/callback_api');

let URL = "amqp://167.172.98.125:5672"

const bookCarsMOM = (cars) => {

    const q = 'car_bookings';

    amqp.connect(URL, function (err, conn) {
        if (err) {
            console.log(err);
            return { error: 'An error occured with the service' }
        }

        conn.createChannel(on_open);

        function on_open(err1, ch) {
            if (err1) {
                console.log(err1);
                return { error: 'An error occured with the service' }
            }
            
            ch.assertQueue(q);

            cars.map(carToBook => {
                const msg = JSON.stringify({ car: carToBook, name: 'HR', email: 'eventplatform@ep.com' });
                ch.sendToQueue(q, Buffer.from(msg));
            })
        }
    });
}

module.exports = {
    bookCarsMOM
}