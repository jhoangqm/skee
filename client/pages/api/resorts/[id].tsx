const { prisma } = require('../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  console.log("QUERY", id);
  const resort = await prisma.resorts.findMany({
    where: {
      province: String(id),
    },
  });
  console.log("SUCCESSFUL", resort);
  res.json(resort);
  
}