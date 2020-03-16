const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({reservations: []}).write();


app.post('/hamppu/uusi', (req, res) => {
    const data = req.body;

    // very basic form field validation
    if (data.startDate === null || data.endDate === null || data.name == "") {
      res.status(400).send();
      return;
    }

    db.get('reservations')
      .push(data)
      .write();

    res.status(200).send();
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});