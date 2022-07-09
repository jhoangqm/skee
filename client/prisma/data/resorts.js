const Chance = require('chance');
const chance = new Chance();

const dateHelper = addDays => {
  let date = new Date();
  date.setDate(date.getDate() + addDays);
  return date.toISOString();
};

const resort = [
  {
    name: 'Cypress Mountain',
    map: 'https://www.skicentral.com/images/trailmaps/604008-2400.jpg',
    vert: chance.integer({ min: 200, max: 1200 }),
    skiableTerrain: chance.integer({ min: 200, max: 600 }),
    runs: chance.integer({ min: 2, max: 20 }),
    lifts: chance.integer({ min: 2, max: 20 }),
    easyRuns: chance.integer({ min: 2, max: 20 }),
    mediumRuns: chance.integer({ min: 2, max: 20 }),
    hardRuns: chance.integer({ min: 2, max: 20 }),
    province: 'BC',
  },
  {
    name: 'Seymour Mountain',
    map: chance.url(),
    vert: chance.integer({ min: 200, max: 1200 }),
    skiableTerrain: chance.integer({ min: 200, max: 600 }),
    runs: chance.integer({ min: 2, max: 20 }),
    lifts: chance.integer({ min: 2, max: 20 }),
    easyRuns: chance.integer({ min: 2, max: 20 }),
    mediumRuns: chance.integer({ min: 2, max: 20 }),
    hardRuns: chance.integer({ min: 2, max: 20 }),
    province: 'BC',
  },
  {
    name: 'Grouse Mountain',
    map: chance.url(),
    vert: chance.integer({ min: 200, max: 1200 }),
    skiableTerrain: chance.integer({ min: 200, max: 600 }),
    runs: chance.integer({ min: 2, max: 20 }),
    lifts: chance.integer({ min: 2, max: 20 }),
    easyRuns: chance.integer({ min: 2, max: 20 }),
    mediumRuns: chance.integer({ min: 2, max: 20 }),
    hardRuns: chance.integer({ min: 2, max: 20 }),
    province: 'BC',
  },
];
const timeSlot = [
  {
    day: dateHelper(1),
    startTime: dateHelper(0),
    duration: 2,
    remainingTime: 6,
  },
  {
    day: dateHelper(1),
    startTime: dateHelper(0),
    duration: 2,
    remainingTime: 6,
  },
  {
    day: dateHelper(1),
    startTime: dateHelper(0),
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
    dateFrom: dateHelper(2),
    dateTo: dateHelper(2),
  },
  {
    resortId: chance.integer({ min: 1, max: 3 }),
    clientId: chance.integer({ min: 1, max: 5 }),
    proId: chance.integer({ min: 1, max: 5 }),
    timeSlotsId: chance.integer({ min: 1, max: 3 }),
    dateFrom: dateHelper(3),
    dateTo: dateHelper(3),
  },
  {
    resortId: chance.integer({ min: 1, max: 3 }),
    clientId: chance.integer({ min: 1, max: 5 }),
    proId: chance.integer({ min: 1, max: 5 }),
    timeSlotsId: chance.integer({ min: 1, max: 3 }),
    dateFrom: dateHelper(4),
    dateTo: dateHelper(4),
  },
];
module.exports = { resort, booking, timeSlot };
