import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(
  function logoutRoute(req: any, res: any) {
    req.session.destroy();
    res.send({ ok: true });
  },
  {
    cookieName: 'user',
    password: 'v85zNiWmcmApJFuUKXDeyW$ShGDJx^7QB%t',
  }
);
