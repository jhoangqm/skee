const { prisma } = require('../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  
  const resort = await prisma.resorts.findMany({
    where: {
      id: Number(id),
    },
  });
  res.json(resort);
  console.log('id Params', resort);
}