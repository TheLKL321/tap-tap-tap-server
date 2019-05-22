const express = require('express');
const app = express();
const port = 7001;
app.get('/', function (request, response) {
    response.send("pong");
});
app.listen(port, function () {
    console.log('Server listening on http://localhost:' + port);
});
