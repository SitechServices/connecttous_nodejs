// source: https://www.npmjs.com/package/azure-iot-device-http
// With minor tweaks by Pieter Geelen

// Load stuff!
var clientFromConnectionString = require('azure-iot-device-http').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

// Remember to template the connection-string as environment variable for best-practises
var connectionString = '[IoT Hub device connection string]';

// Sample Payload
// In this case we stringify to make it parse-able for the Message class.
var sample_message = JSON.stringify({'plant':'kewl_plant', 'tag':'the_perfect_sensor', 'timestamp':1611774590, 'value':5.6895})

// Functions
var client = clientFromConnectionString(connectionString);

var connectCallback = function (err) {
    if (err) {
        console.error('Could not connect: ' + err);
    } else {
        console.log('Client connected');
        var message = new Message(sample_message);
        client.sendEvent(message, function (err) {
            if (err) console.log(err.toString());
        });

        client.on('message', function (msg) {
            console.log(msg);
            client.complete(msg, function () {
                console.log('completed');
            });
        });
    }
};

// The actual execution of the script
client.open(connectCallback);