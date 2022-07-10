var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var os = require('os');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* The port the server will listen on */
var HTTP_PORT = 8080;

/* Global reference to the LED strip */
var strip = require("./strip.js");


// Find the first local, ipv4 address
// This is a 'best guess' that the web server can be accessed
// via this address. Your mileage may vary!
// https://stackoverflow.com/questions/10750303/how-can-i-get-the-local-ip-address-in-node-js
// https://nodejs.org/api/os.html#os_os_networkinterfaces
var interfaces = os.networkInterfaces();
var localAddress = "";
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
			localAddress = address.address;
			break;
        }
    }
}


/*##################
    Home Page
##################*/

app.get("/", function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.sendFile(path.join(__dirname + "/pages/home.html"));
});