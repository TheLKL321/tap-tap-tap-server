const DEFAULT_PORT = 7100;
const RECORD_LIST_LENGTH = 10;

if (process.argv[2] === "help") {
    console.log("Usage: node app.js <port>");
    process.exit(0);
}

let port = DEFAULT_PORT;
if (process.argv.length >= 3)
    port = process.argv[2];

const express = require('express');
const app = express();
app.use(express.json());

let records = [];

app.get('/', (req, res) => {
    console.log("Records requested");
    res.send(JSON.stringify(records));
});

app.post('/addRecord', (req, res) => {
    console.log("Received an entry: \n" + req.body);

    let score = Number(req.body.taps);
    let record = {
        nickname: req.body.nickname,
        taps: Number(req.body.taps),
        timestamp: req.body.timestamp,
    };
    if (records.length < RECORD_LIST_LENGTH) {
        records.push(record);
    } else if (score >= records[RECORD_LIST_LENGTH - 1].taps) {
        records[records.findIndex((element, index, array) => {
            return element === array[RECORD_LIST_LENGTH - 1];
        })] = record;
    }
    records.sort((a, b) => { return b.taps - a.taps });

    res.json({});
});

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});
