import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import * as zod from 'zod';

const verifySchema = zod.object({
  email: zod.string().email(),
  token: zod.string(),
});

/**
 * /api/users/verify
 *
 * GET: Verify user
 *   Request body: { email: string, token: string }
 *   Response redirect: /dashboard
 */
const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  try {
    const { email, token } = verifySchema.parse(req.query);

    const prisma = new PrismaClient();

    const count = await prisma.user.updateMany({
      where: {
        email,
        confirmationToken: token,
      },
      data: {
        confirmed: true,
      },
    });

    if (count.count === 0) {
      // User not found or token is invalid
      return res.redirect('/signup');
    }

    return res.redirect('/dashboard');
  } catch (error) {
    return res.redirect('/signup');
  }
});

export default handler;
