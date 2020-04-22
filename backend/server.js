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

  // reservation start date after end date -> we dont like that!
  if (new Date(data.startDate) > new Date(data.endDate)) {
    res.status(416).send();
    return;
  }

  const overlappingReservations = db.get('reservations')
                                    .filter(function(x) { return filterDateOverlap(x, data) })
                                    .value()


  // overlapping 
  if (overlappingReservations.length > 0) {
    res.status(500).send();
    return;
  }

  db.get('reservations')
    .push(data)
    .write();

  res.status(200).send();
});

app.get('/hamppu/list', (req, res) => {
  const reservationList = db.get('reservations').value();
  res.send(reservationList);
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});


function filterDateOverlap(reservationObject, newReservation) {

  // we turn ISO string to int ( "2020-5-3" -> 20200503 )
  const ostart = parseInt(reservationObject.startDate.split("-").map( x => x.padStart(2, '0')).join(""));
  const oend = parseInt(reservationObject.endDate.split("-").map( x => x.padStart(2, '0')).join(""));

  const nstart = parseInt(newReservation.startDate.split("-").map( x => x.padStart(2, '0')).join(""));
  const nend = parseInt(newReservation.endDate.split("-").map( x => x.padStart(2, '0')).join(""));

  if (ostart <= nend && nstart <= oend) {
    return true;
  }

  return false;
}