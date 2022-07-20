const { prisma } = require('../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  
  // GET all booking where proId matches and order them by ascending
  const booking = await prisma.bookings.findMany({
    where: {
      proId: Number(id),
    },
    orderBy: {
      id: 'asc',
    },
    include: { clients: true, timeSlot: true },
  });
  res.json(booking);
}
