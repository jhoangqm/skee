import { prisma } from '../../../db';
import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

interface ISignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  type: string;
  certBody?: string | undefined;
  level?: string;
  resortId?: string;
  skill?: string;
}

export default withIronSessionApiRoute(
  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const salt = bcrypt.genSaltSync(10);
    const signupData: ISignupData = JSON.parse(req.body);

    //create a client
    if (signupData.type === 'client') {
      const { firstName, lastName, email, password, phoneNumber } = signupData;
      const url = 'http://localhost:8000/image/defaultAvatar.png';

      try {
        const client = await prisma.clients.create({
          data: {
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, salt),
            phoneNumber,
            avatar: url,
          },
        });
        // set session
        req.session.user = {
          id: client.id,
          type: 'client',
        };
        await req.session.save();
        res.json(client);
      } catch (error) {
        res.json('signup Error');
      }
    }

    //create a pro
    if (signupData.type === 'pro') {
      const {
        firstName,
        lastName,
        email,
        password,
        certBody,
        level,
        phoneNumber,
        resortId,
        skill,
      } = signupData;
      try {
        const pro = await prisma.pros.create({
          data: {
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, salt),
            certBody,
            bio: "This is my fight song, prove I'm alright song, take back my life sooooooOOOng",
            level: Number(level),
            phoneNumber,
            resortId: Number(resortId),
            ProsSkills: {
              create: {
                skillId: Number(skill),
              },
            },
          },
        });
        // set session
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
  },
  {
    cookieName: 'user',
    password: process.env.COOKIE_PASS,
  }
);
