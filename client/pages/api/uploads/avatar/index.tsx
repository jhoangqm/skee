import { prisma } from '../../../../db';
import type { NextApiRequest, NextApiResponse } from 'next';



// query function to find all info of pros
// make post request to DB to add cert body to the DB
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // SELECT FROM PROS 
  if (req.method === 'GET') {
    const pros = await prisma.pros.findMany();
    res.json(pros);
  }
  // UPDATE PROS WHERE ID IS AND DATA TO UPDATE IS IMAGE
  if(req.method === 'PATCH'){
    const data = JSON.parse(req.body)
    const {uniqueID, avatar} = data
    const uploadedImage = await prisma.pros.update({
          where: {
            id: uniqueID // calling the ID from the upload component
          },
          data: {
            image: avatar
          },
        });
        res.json(uploadedImage)
  }
}






