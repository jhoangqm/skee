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
const createTimeSlot = async (
  hours: number,
  date: Date,
  bookingDate: string
) => {
  const hrs = new Date(date.setHours(hours));
  const midnight = new Date(date.setHours(-7));
  const timeSlot = await prisma.timeSlots.upsert({
    where: {
      day: midnight.toISOString(),
    },
    update: {
      startTime: hrs,
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
  booking(timeSlot.id, bookingDate);
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    let { date, time } = JSON.parse(req.body);
    const newDate = new Date(date);
    if (time === 'AM') {
      createTimeSlot(2, newDate, date);
    } else if (time === 'PM') {
      createTimeSlot(6, newDate, date);
    } else {
      const hrs = new Date(newDate.setHours(2));
      const midnight = new Date(newDate.setHours(-7));
      const timeSlot = await prisma.timeSlots.create({
        data: {
          day: midnight.toISOString(),
          duration: 6,
          startTime: hrs.toISOString(),
          remainingTime: 0,
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
