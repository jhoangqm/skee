import { orderBy } from 'cypress/types/lodash';
import { resourceLimits } from 'worker_threads';
import { prisma } from '../../../db';

// query function to find all resorts
export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const pros = await prisma.pros.findMany({
     
        
  
include:{  resorts:{  select: {name: true , _count: {select: {pro: true}}}}}
    }
    );
    console.log("QUERY",pros)
    res.json(pros);
  }
}


