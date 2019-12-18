var amqp = require('amqplib/callback_api');
URL = "amqp://167.172.98.125:5672"

var cars = []

function createResponseQueue(userInput) {
    amqp.connect(URL, function (error, connection) {
        if (error) {
            throw error;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) throw error1;

            let response_queue = '';

            channel.assertQueue('', {
                exclusive: true,
            }, (err, ok) => {
                response_queue = ok.queue

                channel.sendToQueue('car_list_request', Buffer.from(userInput), {
                    replyTo: response_queue
                });
                channel.consume(response_queue, (msg) => {
                    cars = JSON.parse(msg.content.toString());
                    channel.ack(msg)
                });
            });
        });
    });
}

async function getCars(make, year) {
    const filter = { make: make, year: year };
    createResponseQueue(JSON.stringify(filter));
    await setTimeout(() => {
        if (cars.length === 0) {
            console.log('No car of this type available, Goodbye!');
            process.exit(1);
        }
        return cars;
    }, 1000);
}

module.exports = {
    getCars
}

