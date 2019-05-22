const PORT = 7100;
const URL = "http://localhost:" + PORT;
const RECORD_LIST_LENGTH = 10;

const express = require('express');
const app = express();
app.use(express.json());

let records = [{ nickname: "lulz", taps: 1337, timestamp: "13/02 1:37:42"}];

app.get('/', (request, response) => {
    response.send(JSON.stringify(records));
});

app.post('/addRecord', (request, response) => {
    console.log("Received an entry:\n" + request.body);

    let score = Number(request.body.taps);
    let record = {
        nickname: request.body.nickname,
        taps: Number(request.body.taps),
        timestamp: request.body.timestamp
    };
    if (records.length < RECORD_LIST_LENGTH) {
        records.push(record);
    } else if (score >= records[RECORD_LIST_LENGTH - 1].taps) {
        records[records.findIndex((element, index, array) => {
            return element === array[RECORD_LIST_LENGTH - 1];
        })] = record;
    }
    records.sort((a, b) => { return a.taps - b.taps });

    response.send("Received");
});

app.listen(PORT, () => {
    console.log('Server listening on ' + URL);
});
