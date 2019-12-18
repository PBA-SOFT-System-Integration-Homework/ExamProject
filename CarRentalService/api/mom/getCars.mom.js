var amqp = require('amqplib/callback_api');

let URL = "amqp://167.172.98.125:5672"
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

async function getCarsMom(carTypeName, numberOfSeats) {
    const filter = {}
    if (carTypeName)
        filter["carTypeName"] = carTypeName
    if (!numberOfSeats)
        filter["numberOfSeats"] = 0
    else
        filter["numberOfSeats"] = numberOfSeats

    createResponseQueue(JSON.stringify(filter));
    await sleep(2000)
    if (cars.length === 0) {
        console.log('No car of this type available, Goodbye!');
        process.exit(1);
    }
    return cars;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

module.exports = {
    getCarsMom
}

