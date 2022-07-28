import { prisma } from '../../../db';
import { withIronSessionApiRoute } from 'iron-session/next';

// query function to find all pros
export default withIronSessionApiRoute(
  async function handler(req: any, res: any) {
    if (req.method === 'GET') {
      const pros = await prisma.pros.findMany({
        include: { resorts: true, ProsSkills: { select: { skills: true } } },
      });
      res.json(pros);
    }
    // updates pros info
    if (req.method === 'PATCH') {
      const data = JSON.parse(req.body);
      const {
        uniqueID,
        firstName,
        lastName,
        bio,
        email,
        phoneNumber,
        certBody,
      } = data;
      const updatedInfo = await prisma.pros.update({
        where: {
          id: uniqueID,
        },
        data: {
          firstName: firstName,
          lastName: lastName,
          bio: bio,
          email: email,
          phoneNumber: phoneNumber,
          certBody: certBody,
        },
      });
      res.json(updatedInfo);
    }
    res.json('404 Not found');
  },
  {
    cookieName: 'user',
    password: process.env.COOKIE_PASS,
  }
);
