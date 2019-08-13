const uuidv4 = require('uuid/v4');

const types = [
    { id: 0, name: 'letter' },
    { id: 1, name: 'package' },
];

const weights = [
    { id: 0, desc: 'Less than 1kg' },
    { id: 1, desc: 'Between 1kg and 5kg' },
    { id: 2, desc: 'More than 5kg' },
];

const offices = new Array(30).fill(null).map((e, i) => ({
    id: uuidv4(),
    PLZ: 80000 + i,
    name: `Office ${i}`,
}));


const shipments = new Array(100).fill(null).map(() => ({
    id: uuidv4(),
    type: randomElement(types),
    origin: randomBool(),
    destination: randomBool(),
    delivered: randomBool(),
    weight: randomElement(weights),
    office: randomElement(offices)
}));

function randomElement(arr) {
    const min = 0;
    const max = arr.length;
    return arr[Math.floor(Math.random() * (max - min)) + min];
}

function randomBool() {
    return !!Math.floor(Math.random() + 0.5);
}

module.exports = {
    types,
    weights,
    shipments,
    offices,
};
