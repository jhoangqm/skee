const { prisma } = require('../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  console.log('id Params', id);
  const booking = await prisma.bookings.findMany({
    where: {
      proId: Number(id),
    },
  });
  res.json(booking);
}
