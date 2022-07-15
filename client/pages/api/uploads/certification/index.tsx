import { prisma } from '../../../../db';
import type { NextApiRequest, NextApiResponse } from 'next';

// query function to find all info of pros
// make post request to DB to add cert body to the DB
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const pros = await prisma.pros.findMany();
    res.json(pros);
  }

  // if (req.method === 'POST') {
  //   const uniqueID = JSON.parse(req.body); 
  //   console.log('UniqueID: ', uniqueID)
  //   const addCertImg = await prisma.bookings.create({
  //     data: {
        // certImg: 
  //
  //     },
  //   });
  //   // console.log(addCertImg)
  //   res.json(addCertImg)
  // }

}




