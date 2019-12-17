var amqp = require('amqplib/callback_api');

URL = "amqp://167.172.98.125:5672"

export function bookCar(booking) {
    const q = 'car_bookings';

    amqp.connect(URL, function (err, conn) {
        if (err) console.log(err);

        conn.createChannel(on_open);

        function on_open(err1, ch) {
            if (err1) console.log(err1);
            ch.assertQueue(q);
            let msg = JSON.stringify(booking);
            ch.sendToQueue(q, Buffer.from(msg));
        }
    });
}
