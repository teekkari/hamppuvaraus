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

  const ostart = reservationObject.startDate.split("-").map(x => parseInt(x));
  const oend = reservationObject.endDate.split("-").map(x => parseInt(x));

  const nstart = newReservation.startDate.split("-").map(x => parseInt(x));
  const nend = newReservation.endDate.split("-").map(x => parseInt(x));


  // if diff. years they probably not overlapping..
  if (ostart[0] != nstart[0]) {
    return false;
  }

  // month overlap
  if (ostart[1] <= nend[1] && nstart[1] <= oend[1]) {

    // day overlap
    if (ostart[2] <= nend[2] && nstart[2] <= oend[2]) {
      return true;
    }
  }


  return false;
}