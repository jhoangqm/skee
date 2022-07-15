import { prisma } from '../../../db';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parsed = JSON.parse(req.body);
  let day = new Date(parsed.date);
  if (req.method === 'POST') {
    day = new Date(day.setHours(-7));
    console.log('day', day);
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
    console.log(slots);
    res.json(slots);
  }
  if (req.method === 'GET') {
    const slots = await prisma.timeSlots.findMany({
      where: {
        day: day,
      },
    });
    res.json(slots);
  }
}
