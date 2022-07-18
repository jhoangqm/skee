const { prisma } = require('../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  // Check availablity
  const available = await prisma.timeSlots.findMany({
    where: {
      prosId: Number(id),
      duration: 3,
      bookings: {
        none: {},
      },
    },
    include: {
      bookings: true,
    },
  });
  res.json(available);
}
