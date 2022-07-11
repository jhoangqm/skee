import { prisma } from '../../../db';

// query function to find all resorts
export default async function handler(_req: any, res: any) {
  const resorts = await prisma.resorts.findMany();
  res.json(resorts);
}