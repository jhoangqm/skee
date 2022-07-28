import { prisma } from '../../../db';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
// cookies handled by ironsession
export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  },
  {
    cookieName: 'user',
    password: process.env.COOKIE_PASS,
  }
);
