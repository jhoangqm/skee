import { prisma } from '../../../../db';
import type { NextApiRequest, NextApiResponse } from 'next';

const uploadedImage = async (
  id: number,
  proId: string,
  certImg: string
  ) => {}

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

  if (req.method === 'POST') {
    console.log('req.body:', req.body)
    const data = JSON.parse(req.body)
    console.log('data is: ', data)
    res.json(data)
  }
}






