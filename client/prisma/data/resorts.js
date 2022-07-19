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
    image:
      'https://github.com/jhoangqm/skee/blob/index-changing/_docs/resort/cypress.jpg?raw=true',
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
    image:
      'https://hikesnearvancouver.ca/wp-content/uploads/2018/03/Mount-Seymour-to-Brockton-Point-Winter-Route-sunset.png',
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
    image:
      'https://i0.wp.com/www.awalkandalark.com/wp-content/uploads/2019/02/23-My-favourite-run-the-Paper-trail.jpg?fit=1024%2C768&ssl=1',
  },
  {
    name: 'Whistler Blackcomb',
    map: chance.url(),
    vert: chance.integer({ min: 200, max: 1200 }),
    skiableTerrain: chance.integer({ min: 200, max: 600 }),
    runs: chance.integer({ min: 2, max: 20 }),
    lifts: chance.integer({ min: 2, max: 20 }),
    easyRuns: chance.integer({ min: 2, max: 20 }),
    mediumRuns: chance.integer({ min: 2, max: 20 }),
    hardRuns: chance.integer({ min: 2, max: 20 }),
    province: 'BC',
    image:
      'https://github.com/jhoangqm/skee/blob/index-changing/_docs/resort/whistler.jpeg?raw=true',
  },
];
const timeSlot = [];

const booking = [
  {
    resortId: chance.integer({ min: 1, max: 3 }),
    clientId: chance.integer({ min: 1, max: 5 }),
    proId: chance.integer({ min: 1, max: 5 }),
    dateFrom: dateHelper(2),
    dateTo: dateHelper(2),
  },
  {
    resortId: chance.integer({ min: 1, max: 3 }),
    clientId: chance.integer({ min: 1, max: 5 }),
    proId: chance.integer({ min: 1, max: 5 }),
    dateFrom: dateHelper(3),
    dateTo: dateHelper(3),
  },
  {
    resortId: chance.integer({ min: 1, max: 3 }),
    clientId: chance.integer({ min: 1, max: 5 }),
    proId: chance.integer({ min: 1, max: 5 }),
    dateFrom: dateHelper(4),
    dateTo: dateHelper(4),
  },
];
module.exports = { resort, booking, timeSlot };
