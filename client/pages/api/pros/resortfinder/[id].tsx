const { prisma } = require("../../../../db");

export default async function handler({ query: { id } }: any, res: any) {
  const pro = await prisma.pros.findMany({
    where: {
      resortId: Number(id),
    },
    include: { resorts: true, ProsSkills: { select: { skills: true } } },
  });
  res.json(pro);
}
