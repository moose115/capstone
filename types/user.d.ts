import { Prisma } from '@prisma/client';

export type UserWithRole = Omit<
  User &
    Prisma.UserGetPayload<{
      include: { role: true };
    }>,
  'password_hash' | 'confirmationToken'
>;
