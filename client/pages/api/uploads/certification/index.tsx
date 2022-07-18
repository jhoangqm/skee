import { prisma } from '../../../../db';
import type { NextApiRequest, NextApiResponse } from 'next';


  

// query function to find all info of pros
// make post request to DB to add cert body to the DB
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET
  if (req.method === 'GET') {
    const pros = await prisma.pros.findMany();
    res.json(pros);
  }
  // INSERT
  if (req.method === 'POST') {
    const data = JSON.parse(req.body)
    const { certImg } = data
    res.json(data)
  }
  // UPDATE
  if(req.method === 'PATCH'){
    const data = JSON.parse(req.body)
    const {uniqueID, certImg} = data
    const uploadedImage = await prisma.pros.update({
          where: {
            id: uniqueID // calling the ID from the upload component
          },
          data: {
            certImg: certImg
          },
        });
        res.json(uploadedImage)
  }
}






