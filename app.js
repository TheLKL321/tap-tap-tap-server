const DEFAULT_PORT = 7100;
const DOMAIN = "http://localhost";
const RECORD_LIST_LENGTH = 10;

let port = DEFAULT_PORT;
if (process.argv.length >= 2)
    port = process.argv[2];
let url = DOMAIN + ":" + port;


const express = require('express');
const app = express();
app.use(express.json());

let records = [];

app.get('/', (request, response) => {
    console.log("Records requested");
    response.send(JSON.stringify(records));
});

app.post('/addRecord', (request, response) => {
    console.log("Received an entry: " + JSON.stringify(request.body));

    let score = Number(request.body.taps);
    let record = {
        nickname: request.body.nickname,
        taps: Number(request.body.taps),
        timestamp: request.body.timestamp,
    };
    if (records.length < RECORD_LIST_LENGTH) {
        records.push(record);
    } else if (score >= records[RECORD_LIST_LENGTH - 1].taps) {
        records[records.findIndex((element, index, array) => {
            return element === array[RECORD_LIST_LENGTH - 1];
        })] = record;
    }
    records.sort((a, b) => { return b.taps - a.taps });

    response.send("Received");
});

app.listen(port, () => {
    console.log('Server listening on ' + url);
});
