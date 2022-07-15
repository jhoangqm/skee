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
  console.log('hi froom blockoff', proId);

  try {
    const timeSlot = await prisma.timeSlots.findFirstOrThrow({
      where: {
        day: midnight.toISOString(),
        prosId: Number(proId),
      },
    });
  } catch (error) {
    if (time === 'AM') {
      const AMSlot = await prisma.timeSlots.create({
        data: {
          day: midnight.toISOString(),
          duration: 3,
          startTime: am.toISOString(),
          remainingTime: 3,
          prosId: Number(proId),
        },
      });
    } else if (time === 'PM') {
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
}
