import { prisma } from '../../../db';
import { withIronSessionApiRoute } from 'iron-session/next';

// query function to find all pros
export default withIronSessionApiRoute(
  async function handler(req: any, res: any) {
    if (req.method === 'POST') {
      const parsed = JSON.parse(req.body);
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
      try {
        const pro = await prisma.pros.create({
          data: {
            firstName,
            lastName,
            email,
            password,
            certBody,
            bio: "This is my fight song, prove I'm alright song, take back my life sooooooOOOng",
            level: Number(level),
            phoneNumber,
            resortId: Number(resortId),
          },
        });
        req.session.user = {
          id: pro.id,
          type: 'pro',
        };
        await req.session.save();
        res.json(pro);
      } catch (error) {
        res.json('signup Error', error);
      }
    }
    if (req.method === 'GET') {
      const pros = await prisma.pros.findMany();
      res.json(pros);
    }
  },
  {
    cookieName: 'user',
    password: 'v85zNiWmcmApJFuUKXDeyW$ShGDJx^7QB%t',
  }
);
