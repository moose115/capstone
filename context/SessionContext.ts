import { User } from '@prisma/client';
import { createContext } from 'react';

const isDevUser =
  process.env.NODE_ENV !== 'production' && process.env.DEV_ROLE === 'user';
const isDevAdmin =
  process.env.NODE_ENV !== 'production' && process.env.DEV_ROLE === 'admin';

const dummyUser: User = {
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

const role = isDevUser ? 'user' : isDevAdmin ? 'admin' : null;

const contextDefault = {
  user: { ...dummyUser, role },
  setSession: (user: User) => {},
};

export const SessionContext = createContext(contextDefault);
