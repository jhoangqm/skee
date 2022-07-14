import { prisma } from '../../../db';
import { withIronSessionApiRoute } from 'iron-session/next';

// query function to find all pros
export default withIronSessionApiRoute(
  async function handler(req: any, res: any) {
    if (req.session.user?.type === 'pro') {
      try {
        const proSession = await prisma.pros.findMany({
          where: {
            id: req.session.user.id,
          },
        });
        res.send(proSession);
      } catch (error) {
        res.json('No such session', error);
      }
    } else if (req.session.user?.type === 'client') {
      try {
        const clientSession = await prisma.clients.findMany({
          where: {
            id: req.session.user.id,
          },
        });
        res.send(clientSession);
      } catch (error) {
        res.json('No such session', error);
      }
    } else {
      res.json('No such session');
    }
  },
  {
    cookieName: 'user',
    password: process.env.COOKIE_PASS,
  }
);
