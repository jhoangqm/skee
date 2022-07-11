import { prisma } from '../../../db';

// query function to find all pros
export default async function handler(_req: any, res: any) {
  const pros = await prisma.pros.findMany();
  res.json(pros);
  
}