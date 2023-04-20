import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import * as zod from 'zod';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string(),
  remember: zod.boolean().optional(),
});

/**
 * /api/session
 *
 * POST: Login
 *   Request body: { email: string, password: string }
 *   Response:
 *     200:
 *       { ok: true }
 *     400:
 *     401:
 *     500:
 *       { error: string }
 *
 * DELETE: Logout
 *   Request body: { sid: string }
 *   Response body: { message: string }
 */
const handler = nc<NextApiRequest, NextApiResponse>()
  .post(async (req, res) => {
    try {
      const { email, password, remember } = loginSchema.parse(req.body);

      const prisma = new PrismaClient();

      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          role: {
            include: {
              permissions: true,
            },
          },
        },
      });

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const session = await prisma.session.create({
        data: {
          user: {
            connect: {
              email: user.email,
            },
          },
        },
      });

      remember
        ? res.setHeader(
            'Set-Cookie',
            `sid=${session.id}; Path=/; HttpOnly; Max-Age=604800`
          )
        : res.setHeader('Set-Cookie', `sid=${session.id}; Path=/; HttpOnly`);

      const { password_hash, ...userWithoutPassword } = user;

      res.status(200).json({ ok: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  .delete(async (req, res) => {
    try {
      const prisma = new PrismaClient();

      await prisma.session.delete({
        where: { id: req.cookies.sid },
      });

      res.setHeader('Set-Cookie', 'sid=; Path=/; HttpOnly; Max-Age=0');

      res.status(200).json({ message: 'Logged out' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export default handler;
