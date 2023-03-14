import { NextApiRequest, NextApiResponse } from 'next/types';
import nc from 'next-connect';
import { ensureRolePermission } from '@/middlewares/auth';
import { Entities } from '@/lib/enums';
import { Actions, PrismaClient, Roles } from '@prisma/client';
import { hash } from 'bcrypt';
import * as zod from 'zod';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const signupSchema = zod.object({
  email: zod
    .string()
    .email()
    .transform((value) => value.toLowerCase()),
  password: zod.string().min(8),
});

/**
 * /api/user
 *
 * GET: Get all users
 *   Request body: { }
 *   Response body: { users: User[] }
 *
 * POST: Create user
 *   Request body: { email: string, password: string }
 *   Response body: { user: User }
 */
const handler = nc<NextApiRequest, NextApiResponse>()
  .get(ensureRolePermission(Entities.USER, Actions.READ), async (req, res) => {
    try {
      const prisma = new PrismaClient();

      const users = await prisma.user.findMany();

      res.json({ users });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  .post(async (req, res) => {
    try {
      const { email, password } = signupSchema.parse(req.body);

      const password_hash = await hash(password, 13);

      const prisma = new PrismaClient();

      const defaultRole = await prisma.role.findUnique({
        where: {
          name: Roles.USER,
        },
      });

      if (!defaultRole) {
        throw new Error('Default role not found');
      }

      const user = await prisma.user.create({
        data: {
          email,
          password_hash,
          role: {
            connect: {
              roleId: defaultRole.roleId,
            },
          },
        },
      });

      console.log(user.confirmationToken);
      /**
       * TODO: Send confirmation email
       */

      res.json({ user });
    } catch (error) {
      if (error instanceof zod.ZodError) {
        return res.status(400).json(error);
      }

      res.status(500).json('' + error);
    }
  });

export default handler;
