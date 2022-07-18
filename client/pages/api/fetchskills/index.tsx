import { prisma } from '../../../db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const skills = await prisma.skills.findMany();
  res.json(skills);
}
