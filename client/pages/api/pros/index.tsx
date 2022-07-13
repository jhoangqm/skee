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
      req.session.user = {
        id: pro.id,
        admin: false,
      };
      await req.session.save();
      res.json(pro);
    }
    if (req.method === 'GET') {
      const pros = await prisma.pros.findMany();
      res.json(pros);
    }
  },
  {
    cookieName: 'proLoggedIn',
    password: 'Ukk3MEP%U&^^6BEpebwcrwVHEyERFqYK$@sk',
  }
);
