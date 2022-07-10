import { prisma } from '../../../db';

// query function to find all pros
export default async function handler(_req: any, res: any) {
  const resorts = await prisma.resorts.findMany();
  res.json(resorts);
}