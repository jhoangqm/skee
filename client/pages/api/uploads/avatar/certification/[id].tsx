const { prisma } = require('../../../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  console.log('id Params', id);
  const certification = await prisma.pros.findMany({
    where: {
      proId: Number(id)
    }
  });
  res.json(certification);
  console.log('Hello from certification: ', certification)
}