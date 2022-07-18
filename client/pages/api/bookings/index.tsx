import { prisma } from '../../../db';
import type { NextApiRequest, NextApiResponse } from 'next';
// create booking
const booking = async (
  id: number,
  date: any,
  proId: string,
  clientId: string
) =>
  await prisma.bookings.create({
    data: {
      clientId: Number(clientId),
      proId: Number(proId),
      resortId: 3,
      timeSlotsId: id,
      dateFrom: date,
      dateTo: date,
    },
  });

const createTimeSlot = async (
  hours: number,
  date: Date,
  prosId: string,
  clientId: string
) => {
  const newDate = new Date(date);
  const hrs = new Date(newDate.setHours(hours));
  const midnight = new Date(newDate.setHours(-7));
  try {
    const timeSlot = await prisma.timeSlots.findMany({
      where: {
        day: midnight,
        startTime: hrs.toISOString(),
        prosId: Number(prosId),
      },
    });
    booking(timeSlot[0].id, date, prosId, clientId);
  } catch (error) {
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    let { date, time, proId, clientId } = JSON.parse(req.body);

    if (time === 'AM') {
      createTimeSlot(2, date, proId, clientId);
    } else if (time === 'PM') {
      createTimeSlot(6, date, proId, clientId);
    }
    res.status(200).json({ message: 'success' });
  }
  // receives patch request to update bookings of pro and set pending to false and accepted to true
  if (req.method === 'PATCH') {
    const uniqueID = JSON.parse(req.body);
    const updateBooking = await prisma.bookings.update({
      where: {
        id: uniqueID,
      },
      data: {
        pending: false,
        accepted: true,
      },
    });
    res.json(updateBooking);
  }
  // GET all bookings that includes timeSlot
  if (req.method === 'GET') {
    const bookings = await prisma.bookings.findMany({
      include: { timeSlot: true },
    });
    res.json(bookings);
  }

  // Reject booking
  if (req.method === 'DELETE') {
    const uniqueID = JSON.parse(req.body);
    const rejectBooking = await prisma.bookings.update({
      where: {
        id: uniqueID,
      },
      data: {
        pending: false,
        accepted: false,
      },
    });
    res.json(rejectBooking);
  }
}
