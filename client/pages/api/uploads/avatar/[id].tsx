const { prisma } = require('../../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  console.log('id Params', id);
  const avatar = await prisma.pros.findMany({
    where: {
      id: Number(id)
    }
  });
  console.log('Hello from avatar: ', avatar)
  res.json(avatar);
}