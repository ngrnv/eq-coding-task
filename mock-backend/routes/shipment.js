const express = require('express');
const router = express.Router();
const db = require('../db-mock/db');
const uuidv4 = require('uuid/v4');

const RESPONSE_TIMEOUT = 2000;

router.get('/list', function(req, res) {
    setTimeout(() => res.send(db.shipments), RESPONSE_TIMEOUT);
});

router.post('/add', function(req, res) {
    const request = req.body;
    const type = getType(request.type);
    const weight = getWeight(request.weight);
    const office = getOffice(request.office);
    const newShipment = {
        id: uuidv4(),
        type,
        origin: request.origin,
        destination: request.destination,
        delivered: request.delivered,
        weight,
        office,
    };
    addToList(newShipment);
    res.send('Shipment added successfully');
});

router.post('/update', function(req, res) {
    const id = req.body.id;
    const updatedShipment = req.body;
    const shipment = getShipment(id);
    const updatedId = updateStatus(shipment, updatedShipment);
    res.send(updatedId + ' updated successfully');
});

router.post('/delete', function(req, res) {
    const id = req.body.id;
    const shipment = getShipment(id);
    const deletedId = deleteShipment(shipment);
    res.send(deletedId + ' deleted successfully');
});

router.post('/get', function(req, res) {
    const id = req.body.id;
    const shipment = getShipment(id);
    res.send(shipment);
});

router.post('/getByZIP', function(req, res) {
    const zip = req.body.zip;
    const shipment = getShipmentByZip(zip);
    res.send(shipment);
});

function updateStatus(shipment, updatedShipment) {
    const pos = db.shipments.indexOf(shipment);
    db.shipments[pos] = updatedShipment;
    return shipment.id;
}

function getShipment(id) {
    const shipment = db.shipments.filter(element => element.id === id);
    if (shipment.length === 0) {
        const err = new Error('No element found');
        err.status = 404;
        throw err;
    } else {
        return shipment[0];
    }
}

function getShipmentByZip(zip) {
    const shipment = db.shipments.filter(element => element.office.PLZ === +zip);
    if (shipment.length === 0) {
        const err = new Error('No element found');
        err.status = 404;
        throw err;
    } else {
        return shipment[0];
    }
}

function deleteShipment(shipment) {
    const pos = db.shipments.indexOf(shipment);
    db.shipments.splice(pos, 1);
    return shipment.id;
}

function getType(selection) {
    const type = db.types.filter(type => type.id === selection);
    if (type.length === 0) {
        const err = new Error('Wrong type');
        err.status = 500;
        throw err;
    } else {
        return type;
    }
}

function getWeight(selection) {
    const weight = db.weights.filter(weight => weight.id === selection);
    if (weight.length === 0) {
        const err = new Error('Wrong weight type');
        err.status = 500;
        throw err;
    } else {
        return weight[0];
    }
}

function getOffice(selection) {
    const office = db.offices.filter(office => office.id === selection);
    if (office.length === 0) {
        const err = new Error('Wrong office type');
        err.status = 500;
        throw err;
    } else {
        return office[0];
    }
}

function addToList(shipment) {
    db.shipments.push(shipment);
}

module.exports = router;
