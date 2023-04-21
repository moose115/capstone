import { ensureSession } from '@/middlewares/auth';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import * as zod from 'zod';

const registerSchema = zod.object({
  courseId: zod.number(),
});

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(ensureSession)
  .post(async (req, res) => {
    try {
      const { courseId } = registerSchema.parse(req.body);
      const { user } = req;
      const prisma = new PrismaClient();

      await prisma.userCourse.create({
        data: {
          course: {
            connect: {
              courseId,
            },
          },
          user: {
            connect: {
              userId: user?.userId || '',
            },
          },
          passed: false,
        },
      });

      res.json({ ok: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export default handler;
