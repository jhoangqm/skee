const { prisma } = require('../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  console.log('id Params', id);
  const client = await prisma.clients.findMany({
    where: {
      id: Number(id)
    },
   
  });
  res.json(client);
}
