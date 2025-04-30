import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('secret', 10);
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin'
    }
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'User'
    }
  });

  const masterRole = await prisma.role.create({
    data: {
      name: 'Master'
    }
  });

  console.log(
    `Created roles: ${adminRole.name}, ${userRole.name}, ${masterRole.name}`
  );

  const user1 = await prisma.user.create({
    data: {
      name: 'Bombardillo',
      email: 'crocodillo@example.com',
      password: hashedPassword,
      roleId: userRole.id
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'tralalero',
      email: 'tralala@example.com',
      password: hashedPassword,
      roleId: adminRole.id
    }
  });
  const user3 = await prisma.user.create({
    data: {
      name: 'tungtungtung',
      email: 'sahur@example.com',
      password: hashedPassword,
      roleId: adminRole.id
    }
  });
  const user4 = await prisma.user.create({
    data: {
      name: 'brrbrr Patapim',
      email: 'patapim@example.com',
      password: hashedPassword,
      roleId: masterRole.id
    }
  });
  console.log(
    `Created users ${user1.name}, ${user2.name}, ${user3.name}, ${user4.name}`
  );

  const billet1 = await prisma.billet.create({
    data: {
      valueToPay: 10000,
      payDay: new Date('2025-09-07T00:00:00Z'),
      userId: user1.id
    }
  });

  console.log(`Created billet: ${billet1.valueToPay}`);
}

// Chama a função principal
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
