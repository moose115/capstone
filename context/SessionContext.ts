import { SessionWithUserSafe } from '@/types/session';
import { UserWithRole } from '@/types/user';
import { Prisma, Role, Roles, User, Session } from '@prisma/client';
import { createContext } from 'react';

const isDev = process.env.NODE_ENV !== 'production';
const isDevUser = isDev && process.env.DEV_ROLE === 'user';
const isDevAdmin = isDev && process.env.DEV_ROLE === 'admin';

const { password_hash, ...dummyUser }: User = {
  userId: '1231232131',
  email: 'johndoe@gmail.com',
  password_hash: '',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '123-456-7890',
  band: 'The Band',
  address: '123 Main St',
  city: 'New York',
  province: 'NY',
  postal: '12345',
  createdAt: new Date(),
  updatedAt: new Date(),
  confirmed: true,
  confirmationToken: '',
  roleId: 1n,
};

const role: Role = {
  name: isDevUser ? Roles.USER : isDevAdmin ? Roles.ADMIN : Roles.USER,
  roleId: 1n,
};

const userWithRole: UserWithRole = {
  ...dummyUser,
  role,
};

export type SessionContextType = {
  session?: SessionWithUserSafe;
  setSession?: (session: SessionWithUserSafe) => void;
};

const contextDefaultDev: SessionContextType = {
  session: {
    id: '123',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    userId: userWithRole.userId,
    user: {
      ...userWithRole,
    },
  },
  setSession: () => {},
};

export const SessionContext = createContext<SessionContextType>(
  isDev && (isDevUser || isDevAdmin) ? contextDefaultDev : {}
);
