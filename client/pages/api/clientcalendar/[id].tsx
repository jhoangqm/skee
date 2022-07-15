const { prisma } = require('../../../db');

export default async function handler({ query: { id } }: any, res: any) {
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
