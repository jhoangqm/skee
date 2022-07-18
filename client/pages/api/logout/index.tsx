import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(
  function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
    req.session.destroy();
    res.send({ ok: true });
  },
  {
    cookieName: 'user',
    password: process.env.COOKIE_PASS,
  }
);
