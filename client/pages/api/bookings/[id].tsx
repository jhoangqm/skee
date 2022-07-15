const { prisma } = require('../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  console.log('id Params', id);
  const booking = await prisma.bookings.findMany({
    where: {
      proId: Number(id)
    },
    orderBy: {
      id: 'asc'
    }
  });
  res.json(booking);
  // console.log('Hello from booking: ', booking)
}