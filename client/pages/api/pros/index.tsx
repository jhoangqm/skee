import { prisma } from '../../../db';

// query function to find all pros
export default async function handler(req: any, res: any) {
  const parsed = JSON.parse(req.body);
  if (req.method === 'POST') {
    const {
      firstName,
      lastName,
      email,
      password,
      certBody,
      level,
      phoneNumber,
      resortId,
    } = parsed;
    const pro = await prisma.pros.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        certBody,
        bio: '',
        level: Number(level),
        phoneNumber,
        resortId: Number(resortId),
      },
    });

    res.status(200).json({ message: 'Pro created' });
  }
  if (req.method === 'GET') {
    const pros = await prisma.pros.findMany();
    res.json(pros);
  }
}
