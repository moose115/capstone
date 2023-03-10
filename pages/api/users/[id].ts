import { Entities } from '@/lib/enums';
import { ensureSession, hasPermission } from '@/middlewares/auth';
import { Actions, PrismaClient, Roles } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

/**
 * /api/users/[id]
 *
 * GET: Get user by id
 *   Request body: { id: string }
 *   Response body: { user: User }
 *
 * PUT: Update user by id
 *   Request body: { ...User }
 *   Response body: { user: User }
 *
 * DELETE: Delete user by id
 *   Request body: { id: string }
 *   Response body: { ok: boolean }
 */

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(ensureSession)
  .get(async (req, res) => {
    try {
      const id = req.query.id as string;
      const prisma = new PrismaClient();

      const user = req.user;

      if (
        (id === user?.userId &&
          hasPermission(user, Entities.USER, Actions.READ_SELF)) ||
        hasPermission(user, Entities.USER, Actions.READ)
      ) {
        const user = await prisma.user.findUnique({
          where: {
            userId: id,
          },
        });

        return res.json({ user });
      }
    } catch (error) {}
  });
