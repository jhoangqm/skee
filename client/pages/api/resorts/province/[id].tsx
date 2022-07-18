const { prisma } = require('../../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  // find resorts where hte province has id
  const resort = await prisma.resorts.findMany({
    where: {
      province : String(id),
    },
  });
  res.json(resort);
  
}


