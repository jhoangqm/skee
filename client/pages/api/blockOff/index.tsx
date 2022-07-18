import { prisma } from '../../../db';
import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { proId, time, date } = JSON.parse(req.body);
  date = new Date(date);
  const am = new Date(date.setHours(2));
  const pm = new Date(date.setHours(6));
  const midnight = new Date(date.setHours(-7));
  // checks if time slot AM, if it is then execute create in timeSlots table
  if (time === 'AM') {
    try {
      await prisma.timeSlots.findFirstOrThrow({
        where: {
          day: midnight.toISOString(),
          prosId: Number(proId),
          startTime: am.toISOString(),
        },
      });
    } catch (error) {
      const AMSlot = await prisma.timeSlots.create({
        data: {
          day: midnight.toISOString(),
          duration: 3,
          startTime: am.toISOString(),
          remainingTime: 3,
          prosId: Number(proId),
        },
      });
    }
      // checks if time slot PM, if it is then execute create in timeSlots table
  } else if (time === 'PM') {
    try {
      await prisma.timeSlots.findFirstOrThrow({
        where: {
          day: midnight.toISOString(),
          prosId: Number(proId),
          startTime: pm.toISOString(),
        },
      });
    } catch {
      const PMSlot = await prisma.timeSlots.create({
        data: {
          day: midnight.toISOString(),
          duration: 3,
          startTime: pm.toISOString(),
          remainingTime: 3,
          prosId: Number(proId),
        },
      });
    }
  }
  res.json({ message: 'success' });
}
