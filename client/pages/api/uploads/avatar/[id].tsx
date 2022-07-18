const { prisma } = require('../../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  // Select from DB where ID is
  const avatar = await prisma.pros.findMany({
    where: {
      id: Number(id)
    }
  });
  res.json(avatar);
}