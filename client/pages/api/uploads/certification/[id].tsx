const { prisma } = require('../../../../db');

export default async function handler({ query: { id } }: any, res: any) {
 // SELECT ALL FROM PROS WHERE ID is
  const certification = await prisma.pros.findMany({
    where: {
      id: Number(id)
    }
  });
  res.json(certification);
  
}

