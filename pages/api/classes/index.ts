import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';
import * as zod from 'zod';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const courseSchema = zod.object({
  courseName: zod.string(),
  date: zod.string().or(zod.date()),
  inPerson: zod.boolean(),
  courseDescription: zod.string(),
  canvaLink: zod.string(),
});

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    try {
      const prisma = new PrismaClient();

      const classes = await prisma.course.findMany();

      res.json({ classes });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error GET' });
    }
  })
  .post(async (req, res) => {
    try {
      const {
        courseName,
        date,
        inPerson: isOnline,
        courseDescription,
        canvaLink,
      } = courseSchema.parse(req.body);

      const prisma = new PrismaClient();

      const newClass = await prisma.course.create({
        data: {
          courseName,
          date,
          isOnline,
          courseDescription,
          canvaLink,
        },
      });

      res.json({ ok: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error POST' });
    }
  });

export default handler;
