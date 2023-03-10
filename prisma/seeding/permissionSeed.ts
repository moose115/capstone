import { PrismaClient, Actions } from '@prisma/client';
import { Entities } from '../../lib/enums';

const prisma = new PrismaClient();

const seed = () => {
  prisma.permission.deleteMany({});
  for (const entity of Object.values(Entities)) {
    for (const action of Object.values(Actions)) {
      prisma.permission.create({
        data: {
          name: entity,
          action: action,
        },
      });
    }
  }
};

seed();
