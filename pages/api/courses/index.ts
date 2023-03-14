import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import * as zod from 'zod';
import { PrismaClient, Course, Actions } from '@prisma/client';
import { ensureRolePermission, ensureSession } from '@/middlewares/auth';
import { Entities } from '@/lib/enums';

const createCourseSchema = zod.object({
  courseName: zod.string(),
  courseDescription: zod.string(),
  isOnline: zod.boolean().default(false),
  canvaLink: zod.string().optional(),
});

/**
 * /api/courses
 *
 * GET: Get all courses
 *   Request body: { }
 *   Response body: { courses: Course[] }
 *
 * POST: Create course
 *   Request body: { courseName: string, courseDescription: string, isOnline: boolean?, canvaLink: string? }
 *   Response body: { course: Course }
 */
const handler = nc<NextApiRequest, NextApiResponse>()
  .use(ensureSession)
  .get(async (req, res) => {
    try {
      const prisma = new PrismaClient();
      const courses = await prisma.course.findMany();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  .post(
    ensureRolePermission(Entities.COURSE, Actions.CREATE),
    async (req, res) => {
      try {
        const course = createCourseSchema.parse(req.body);
        const prisma = new PrismaClient();

        const newCourse = await prisma.course.create({
          data: course,
        });

        res.status(200).json(newCourse);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  );
