import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { Actions, Permission, PrismaClient, Role, User } from '@prisma/client';
import { Entities } from '@/lib/enums';

export const ensureSession = nc<NextApiRequest, NextApiResponse>().use(
  async (req, res, next) => {
    const sid = req.cookies.sid;
    if (!sid) {
      // No session ID, send 401
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const prisma = new PrismaClient();

      const session = await prisma.session.findUnique({
        where: { id: sid },
        include: {
          user: {
            include: {
              role: {
                include: {
                  permissions: true,
                },
              },
            },
          },
        },
      });

      if (!session) {
        // No session found, send 401
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Set user on request
      req.user = session.user;
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    next();
  }
);

export const ensureRolePermission = (entity: Entities, action: Actions) =>
  nc<NextApiRequest, NextApiResponse>()
    .use(ensureSession)
    .use((req, res, next) => {
      const user = req.user;

      if (user && !hasPermission(user, entity, action)) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      next();
    });

export const hasPermission = (
  user: (User & { role: Role & { permissions: Permission[] } }) | undefined,
  entity: Entities,
  action: Actions
) =>
  !!user?.role.permissions.some(
    (perm) => perm.name === entity && perm.action === action
  );
