import { prisma } from '../../../db';
import { withIronSessionApiRoute } from 'iron-session/next';
// cookies handled by ironsession
export default withIronSessionApiRoute(
  async function handler(req: any, res: any) {
    if (req.method === 'GET') {
      const client = await prisma.clients.findMany();
      res.json(client);
    }
    // Updates user info DB
    if (req.method === 'PATCH') {
      const data = JSON.parse(req.body);
      const { uniqueID, firstName, lastName, email, phoneNumber } = data;
      const updatedInfo = await prisma.clients.update({
        where: {
          id: uniqueID,
        },
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
        },
      });
      res.json(updatedInfo);
    }
    // Adds user info to DB
    if (req.method === 'POST') {
      const parsed = JSON.parse(req.body);
      const { firstName, lastName, email, password, phoneNumber } = parsed;
      const url = 'http://localhost:8000/image/defaultAvatar.png';
      try {
        const client = await prisma.clients.create({
          data: {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            avatar: url,
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
