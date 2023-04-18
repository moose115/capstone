import { Session } from '@prisma/client';

export type SessionWithUserSafe = Session & {
  user: UserWithRole;
};
