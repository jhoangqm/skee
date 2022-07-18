const { prisma } = require('../../../db');

export default async function handler({ query: { id } }: any, res: any) {
// find clients where they have booked
  const client = await prisma.clients.findMany({
    where: {
      id: Number(id)
    },

    include: { 
      bookings: {
        include : { 
          timeSlot: true, 
          resorts: true, 
          Pros : true
        } 
      },  
      ClientsSkills: {
        include: {
          skills: true
        }
      }
    }
  });
  res.json(client);
}
