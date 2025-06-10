import bcrypt from 'bcryptjs';
import { PrismaClient, Prisma } from '../app/generated/prisma';

const prisma = new PrismaClient();

const hashed1 = await bcrypt.hash('peteriscool', 10);
const hashed2 = await bcrypt.hash('katiedidtoo', 10);

const userData: Prisma.userCreateInput[] = [
  {
    username: 'petersmith',
    email: 'petersmith@gmail.com',
    password: {
      create: {
        hash: hashed1,
      },
    },
    collection: {
      createMany: {
        data: [
          {
            name: 'Buffalo Trace',
            type: 'Bourbon',
            status: 'SEALED',
            distiller: 'Buffalo Trace',
            producer: 'Sazerac',
            country: 'USA',
            region: 'KY',
            price: '24.99',
            age: 'NAS',
            proof: '90',
            year: '2025',
            barrel: 'N/A',
            finishing: 'None',
            openDate: '07/25/2025',
            killDate: undefined,
            imageUrl: undefined,
          },
          {
            name: 'Elijah Craig Small Batch',
            type: 'Bourbon',
            status: 'SEALED',
            distiller: 'Elijah Craig',
            producer: 'Heaven Hill',
            country: 'USA',
            region: 'KY',
            price: '27.99',
            age: 'NAS',
            proof: '94',
            year: '2024',
            barrel: 'N/A',
            finishing: 'None',
            openDate: '06/15/2025',
            killDate: undefined,
            imageUrl: undefined,
          },
        ],
      },
    },
  },
  {
    username: 'katiepillar',
    email: 'katiesmith@gmail.com',
    password: {
      create: {
        hash: hashed2,
      },
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
