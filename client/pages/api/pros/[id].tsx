const { prisma } = require('../../../db');

export default async function handler({ query: { id } }: any, res: any) {
  console.log('id Params', id);
  const pro = await prisma.pros.findMany({
    where: {
      id: Number(id)
    },
    include: {resorts: true, ProsSkills: {select: {skills: true}}}
  })
  res.json(pro);
}
