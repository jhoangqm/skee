import { prisma } from '../../../db';
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(
  async function handler(req: any, res: any) {
    if ((req.method = 'POST')) {
      const parsed = JSON.parse(req.body);
      const { firstName, lastName, email, password, phoneNumber } = parsed;
      try {
        const client = await prisma.clients.create({
          data: {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
          },
        });
        req.session.user = {
          id: client.id,
          type: 'client',
        };
        await req.session.save();
        res.json(client);
      } catch (error) {
        res.json('signup Error', error);
      }
    }
  },
  {
    cookieName: 'user',
    password: process.env.COOKIE_PASS,
  }
);
