import { prisma } from '../../../db';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parsed = JSON.parse(req.body);
  let day = new Date(parsed.date);
  //POST get day and prosid from timeSlots table
  if (req.method === 'POST') {
    day = new Date(day.setHours(-7));
    console.log('allData', parsed);
    const slots = await prisma.timeSlots.findMany({
      where: {
        day: day,
        prosId: Number(parsed.proId),
      },
    });
    console.log(slots);
    res.json(slots);
  }
  // GET day and prosId from timeSlot table
  if (req.method === 'GET') {
    const slots = await prisma.timeSlots.findMany({
      where: {
        day: day,
        prosId: Number(parsed.proId),
      },
    });
    res.json(slots);
  }
}
