import { ensureSession } from '@/middlewares/auth';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

/**
 * /api/users/me
 *
 * GET: Get current user
 *   Request body: { }
 *   Response body:
 *     200:
 *       { user: User }
 *     401:
 *     500:
 *      { error: string }
 *
 */
const handler = nc<NextApiRequest, NextApiResponse>()
  .use(ensureSession)
  .get(async (req, res) => {
    try {
      return res.status(200).json({ user: req.user });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

export default handler;
