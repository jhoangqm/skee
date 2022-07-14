import { prisma } from '../../../db';
import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(
  async function loginHandler(req: any, res: any) {
    const loginData = JSON.parse(req.body);
    console.log(loginData);
    if (loginData.userType === 'proChecked') {
      try {
        const pro = await prisma.pros.findMany({
          where: {
            email: loginData.email,
            password: loginData.password,
          },
        });
        req.session.user = {
          id: pro[0].id,
          type: 'pro',
        };
        await req.session.save();
        res.json(pro);
      } catch (error) {
        res.json('login Error', error);
      }
    }
  },
  {
    cookieName: 'user',
    password: 'v85zNiWmcmApJFuUKXDeyW$ShGDJx^7QB%t',
  }
);
