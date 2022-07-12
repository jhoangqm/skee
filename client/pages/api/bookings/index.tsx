import { prisma } from '../../../db';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const date = JSON.parse(req.body);
    const booking = await prisma.bookings.create({
      data: {
        clientId: 1,
        proId: 2,
        resortId: 3,
        timeSlotsId: 2,
        dateFrom: date,
        dateTo: date,
      },
    });
  }
  if (req.method === 'GET') {
    const bookings = await prisma.bookings.findMany();
    res.json(bookings);
  }
}
