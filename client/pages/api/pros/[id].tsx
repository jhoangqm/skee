const { prisma } = require('../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  // find pros with the id
  const pro = await prisma.pros.findMany({
    where: {
      id: Number(id)
    },
   
  });
  res.json(pro);
}
