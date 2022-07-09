const Chance = require('chance');
const chance = new Chance();
const moment = require('moment');
const resort = [
  {
    name: chance.word(),
    map: chance.url(),
    vert: chance.integer({ min: 200, max: 1200 }),
    skiableTerrain: chance.integer({ min: 200, max: 600 }),
    runs: chance.integer({ min: 2, max: 20 }),
    lifts: chance.integer({ min: 2, max: 20 }),
    easyRuns: chance.integer({ min: 2, max: 20 }),
    mediumRuns: chance.integer({ min: 2, max: 20 }),
    hardRuns: chance.integer({ min: 2, max: 20 }),
  },
  {
    name: chance.word(),
    map: chance.url(),
    vert: chance.integer({ min: 200, max: 1200 }),
    skiableTerrain: chance.integer({ min: 200, max: 600 }),
    runs: chance.integer({ min: 2, max: 20 }),
    lifts: chance.integer({ min: 2, max: 20 }),
    easyRuns: chance.integer({ min: 2, max: 20 }),
    mediumRuns: chance.integer({ min: 2, max: 20 }),
    hardRuns: chance.integer({ min: 2, max: 20 }),
  },
  {
    name: chance.word(),
    map: chance.url(),
    vert: chance.integer({ min: 200, max: 1200 }),
    skiableTerrain: chance.integer({ min: 200, max: 600 }),
    runs: chance.integer({ min: 2, max: 20 }),
    lifts: chance.integer({ min: 2, max: 20 }),
    easyRuns: chance.integer({ min: 2, max: 20 }),
    mediumRuns: chance.integer({ min: 2, max: 20 }),
    hardRuns: chance.integer({ min: 2, max: 20 }),
  },
];
const timeSlot = [
  {
    day: new Date(),
    startTime: new Date(),
    duration: 2,
    remainingTime: 6,
  },
  {
    day: new Date(),
    startTime: new Date(),
    duration: 2,
    remainingTime: 6,
  },
  {
    day: new Date(),
    startTime: new Date(),
    duration: 2,
    remainingTime: 6,
  },
];

const booking = [
  {
    resortId: chance.integer({ min: 1, max: 3 }),
    clientId: chance.integer({ min: 1, max: 5 }),
    proId: chance.integer({ min: 1, max: 5 }),
    timeSlotsId: chance.integer({ min: 1, max: 3 }),
    dateFrom: new Date(),
    dateTo: new Date(),
  },
  {
    resortId: chance.integer({ min: 1, max: 3 }),
    clientId: chance.integer({ min: 1, max: 5 }),
    proId: chance.integer({ min: 1, max: 5 }),
    timeSlotsId: chance.integer({ min: 1, max: 3 }),
    dateFrom: new Date(),
    dateTo: new Date(),
  },
  {
    resortId: chance.integer({ min: 1, max: 3 }),
    clientId: chance.integer({ min: 1, max: 5 }),
    proId: chance.integer({ min: 1, max: 5 }),
    timeSlotsId: chance.integer({ min: 1, max: 3 }),
    dateFrom: new Date(),
    dateTo: new Date(),
  },
];
module.exports = { resort, booking, timeSlot };
