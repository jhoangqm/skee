import { prisma } from '../../../db';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parsed = JSON.parse(req.body);
  let day = new Date(parsed.date);
  // Insert info to DB
  if (req.method === 'POST') {
    day = new Date(day.setUTCHours(0));
    const slots = await prisma.timeSlots.findMany({
      where: {
        day: day,
        prosId: Number(parsed.proId),
        bookings: {
          none: {},
        },
      },
      include: {
        bookings: true,
      },
    });
    res.json(slots);
  }
  // Select info from DB
  if (req.method === 'GET') {
    const slots = await prisma.timeSlots.findMany({
      where: {
        day: day,
      },
    });
    res.json(slots);
  }
}
