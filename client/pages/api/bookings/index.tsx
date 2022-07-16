import { prisma } from '../../../db';
import type { NextApiRequest, NextApiResponse } from 'next';
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
    console.log('this is the timeslot', timeSlot);
    booking(timeSlot[0].id, date, prosId, clientId);
  } catch (error) {
    console.log('error', error);
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

  if (req.method === 'PATCH') {
    const uniqueID = JSON.parse(req.body);
    console.log('UniqueID: ', uniqueID);
    const updateBooking = await prisma.bookings.update({
      where: {
        id: uniqueID,
      },
      data: {
        pending: false,
        accepted: true,
      },
    });
    // console.log(updateBooking)
    res.json(updateBooking);
  }

  if (req.method === 'GET') {
    const bookings = await prisma.bookings.findMany({
      include: { timeSlot: true },
    });
    res.json(bookings);
  }

  // Reject booking
  if (req.method === 'DELETE') {
    const uniqueID = JSON.parse(req.body);
    console.log('UniqueID: ', uniqueID);
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
