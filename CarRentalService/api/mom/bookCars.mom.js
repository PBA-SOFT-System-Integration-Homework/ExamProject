var amqp = require('amqplib/callback_api');

let URL = "amqp://167.172.98.125:5672"

export function bookCarsMOM(bookings) {

    const q = 'car_bookings';

    amqp.connect(URL, function (err, conn) {
        if (err) console.log(err);

        conn.createChannel(on_open);

        function on_open(err1, ch) {
            if (err1) console.log(err1);
            ch.assertQueue(q);

            bookings.map(carToBook => {
                const msg = JSON.stringify({car : carToBook, name: 'HR', email: 'eventplatform@ep.com'});
                ch.sendToQueue(q, Buffer.from(msg));
            })
        }
    });
}
