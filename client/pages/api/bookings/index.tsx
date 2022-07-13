import { prisma } from '../../../db';
import type { NextApiRequest, NextApiResponse } from 'next';
const booking = async (id: number, date: any) =>
  await prisma.bookings.create({
    data: {
      clientId: 1,
      proId: 2,
      resortId: 3,
      timeSlotsId: id,
      dateFrom: date,
      dateTo: date,
    },
  });
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    let { date, time } = JSON.parse(req.body);
    const hrsDate = new Date(date);
    const newDate = new Date(date);
    if (time === 'AM') {
      const hrs = new Date(hrsDate.setHours(2));
      const midnight = new Date(newDate.setHours(-7));
      console.log('date', new Date(date));
      const timeSlot = await prisma.timeSlots.upsert({
        where: {
          day: midnight.toISOString(),
        },
        update: {
          remainingTime: 0,
          duration: 6,
        },
        create: {
          day: midnight.toISOString(),
          duration: 3,
          startTime: hrs.toISOString(),
          remainingTime: 3,
        },
      });
      booking(timeSlot.id, date);
    } else {
      const hrs = new Date(hrsDate.setHours(6));
      const midnight = new Date(newDate.setHours(-7));
      const timeSlot = await prisma.timeSlots.upsert({
        where: {
          day: midnight.toISOString(),
        },
        update: {
          remainingTime: 0,
          duration: 6,
        },
        create: {
          day: midnight.toISOString(),
          duration: 3,
          startTime: hrs.toISOString(),
          remainingTime: 3,
        },
      });
      booking(timeSlot.id, date);
    }
    res.status(200).json({ message: 'success' });
  }
  if (req.method === 'GET') {
    const bookings = await prisma.bookings.findMany();
    res.json(bookings);
  }
}
