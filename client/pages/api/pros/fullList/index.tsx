import { withIronSessionApiRoute } from "iron-session/next/dist";
const { prisma } = require('../../../../db');

export default 
async function handler( req: any, res: any) {
  if (req.method === 'GET') {
  const pro = await prisma.pros.findMany({
    // where: {
    //   id:
    //     Number(id)
    // },
include: { resorts: true }
  });
  res.json(pro);
}
}
