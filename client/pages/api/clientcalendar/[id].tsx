const { prisma } = require('../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  // SELECT ALL FROM TIMESLOTS WHERE 
  const booking = await prisma.timeSlots.findMany({
    where: {
      prosId: Number(id),
      bookings: {
        none: {},
      },
    },
    include: {
      bookings: true,
    },
  });
  res.json(booking);
}
