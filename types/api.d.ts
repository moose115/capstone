import { Permission, Role, User } from '@prisma/client';

declare module 'next' {
  export interface NextApiRequest {
    user?: User & {
      role: Role & {
        permissions: Permission[];
      };
    };
  }
}
