const { prisma } = require('../../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  console.log('id Params from cert', id);
  const certification = await prisma.pros.findMany({
    where: {
      id: Number(id)
    }
  });
  res.json(certification);
  console.log('Hello from certification: ', certification)
}

