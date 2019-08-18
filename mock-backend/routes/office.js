const express = require('express');
const router = express.Router();
const db = require('../db-mock/db');
const uuidv4 = require('uuid/v4');

const RESPONSE_TIMEOUT = 1000;

router.get('/list', function (req, res) {
  setTimeout(() => res.send(db.offices), RESPONSE_TIMEOUT);
});

router.post('/add', function (req, res) {
  const request = req.body;
  const newOffice = {
    id: uuidv4(),
    PLZ: request.PLZ,
    name: request.name,
  };
  addToList(newOffice);
  setTimeout(() => res.send({ id: newOffice.id }), RESPONSE_TIMEOUT);
});

router.post('/update', function (req, res) {
  const id = req.body.id;
  const updatedOffice = req.body;
  const office = getOffice(id);
  console.log(office);
  const updatedId = updateOffice(office, updatedOffice);
  res.send({ id: updatedId });
});

router.post('/delete', function (req, res) {
  const id = req.body.id;
  const office = getOffice(id);
  const deletedId = deleteOffice(office);
  res.send({ id: deletedId });
});

router.post('/get', function (req, res) {
  const id = req.body.id;
  new Promise((res, rej) => setTimeout(() => res(id), RESPONSE_TIMEOUT))
    .then(id => {
      return getOffice(id);
    })
    .then(office => res.send(office))
    .catch(err => res.status(err.status).send({ error: err.message }))
});

router.post('/getByZip', function (req, res) {
  const zip = req.body.zip;

  new Promise((res, rej) => setTimeout(() => res(zip), RESPONSE_TIMEOUT))
    .then(zip => {
      return getOfficeByZip(zip);
    })
    .then(office => res.send(office))
    .catch(err => res.status(err.status).send({ error: err.message }))
});

function updateOffice(office, updatedOffice) {
  const pos = db.offices.indexOf(office);
  db.offices[pos] = updatedOffice;
  return office.id;
}

function deleteOffice(office) {
  const pos = db.offices.indexOf(office);
  db.offices.splice(pos, 1);
  return office.id;
}

function getOffice(selection) {
  const office = db.offices.filter(office => office.id === selection);
  if (office.length === 0) {
    const err = new Error('No such office');
    err.status = 500;
    throw err;
  } else {
    return office[0];
  }
}

function getOfficeByZip(zip) {
  const office = db.offices.filter(office => office.PLZ === +zip);
  if (office.length === 0) {
    const err = new Error('No such office');
    err.status = 500;
    throw err;
  } else {
    return office[0];
  }
}

function addToList(shipment) {
  db.offices.push(shipment);
}

module.exports = router;
