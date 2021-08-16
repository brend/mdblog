const config = require('./config');

const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');

var app = express();

function success(message, postId) {
    return {success: true, message: message, postId: postId};
}

function failure(message) {
    return {success: false, message: message};
}

/////////// global header, MUST come first ///////////

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/////////// blog frontend ///////////

app
    .use(compression())
    .use(bodyParser.json())
    // Static content
    .use(express.static(config.HTTP_PUBLIC))
    // Default route
    .get('/', function(req, res) {
      res.sendFile(config.HTTP_PUBLIC + 'index.html');
    })
    // Start server
    .listen(config.SERVER_PORT, function () {
        console.log('Port: ' + config.SERVER_PORT);
        console.log('Html: ' + config.HTTP_PUBLIC);
    });

/////////// API ///////////

app.use(require('./routes/post'));