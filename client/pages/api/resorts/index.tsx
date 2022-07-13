import { prisma } from '../../../db';

// query function to find all resorts
export default async function handler(req: any, res: any) {
  if (req.method === 'GET'){
  const resorts = await prisma.resorts.findMany();
  res.json(resorts);
  }
}


