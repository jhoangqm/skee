const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Chance = require('chance');
const {
  client,
  pro,
  skill,
  clientsSkill,
  prosSkill,
  review,
} = require('./data/users');
const { resort, booking, timeSlot } = require('./data/resorts');
const chance = new Chance();

async function seed() {
  await prisma.clients.deleteMany();
  await prisma.pros.deleteMany();
  await prisma.skills.deleteMany();
  await prisma.clientsSkills.deleteMany();
  await prisma.prosSkills.deleteMany();
  await prisma.resorts.deleteMany();
  await prisma.timeSlot.deleteMany();
  await prisma.review.deleteMany();
  await prisma.bookings.deleteMany();

  for (const r of resort) {
    await prisma.resorts.create({
      data: r,
    });
  }
  for (const c of client) {
    await prisma.clients.create({
      data: c,
    });
  }
  for (const p of pro) {
    await prisma.pros.create({
      data: p,
    });
  }
  for (const s of skill) {
    await prisma.skills.create({
      data: s,
    });
  }
  for (const cs of clientsSkill) {
    await prisma.clientsSkills.create({
      data: cs,
    });
  }
  for (const ps of prosSkill) {
    await prisma.prosSkills.create({
      data: ps,
    });
  }
  for (const r of review) {
    await prisma.reviews.create({
      data: r,
    });
  }
  for (const ts of timeSlot) {
    await prisma.timeSlots.create({
      data: ts,
    });
  }
  for (const b of booking) {
    await prisma.bookings.create({
      data: b,
    });
  }
  console.log('DB Seeded! 🌱');
}
seed()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
