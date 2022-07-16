const { prisma } = require('../../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  console.log('id Params', id);
  const pro = await prisma.pros.findMany({
    where: {
      resortId:
        Number(id)
    },
include: {resorts: true}
  });
  res.json(pro);
}
