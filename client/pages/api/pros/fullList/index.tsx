import { withIronSessionApiRoute } from "iron-session/next/dist";
const { prisma } = require('../../../../db');

export default 
// gets pros that are included in the resorts table
async function handler( req: any, res: any) {
  if (req.method === 'GET') {
  const pro = await prisma.pros.findMany({
    
    
include: { resorts: true }
  });
  res.json(pro);
}
}
