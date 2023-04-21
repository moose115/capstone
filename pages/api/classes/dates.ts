import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  try {
    const prisma = new PrismaClient();

    const dates = await prisma.course.findMany({
      where: {
        isOnline: false,
      },
      select: {
        date: true,
      },
    });

    res.json(dates);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default handler;
