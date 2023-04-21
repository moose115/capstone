import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';
import * as zod from 'zod';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  try {
    const prisma = new PrismaClient();

    const registrations = await prisma.userCourse.findMany({
      include: {
        user: true,
        course: true,
      },
    });

    res.json({ registrations });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default handler;
