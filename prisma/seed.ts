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
      cargoId: userRole.id
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'tralalero',
      email: 'tralala@example.com',
      password: hashedPassword,
      cargoId: adminRole.id
    }
  });
  const user3 = await prisma.user.create({
    data: {
      name: 'tungtungtung',
      email: 'sahur@example.com',
      password: hashedPassword,
      cargoId: adminRole.id
    }
  });
  const user4 = await prisma.user.create({
    data: {
      name: 'brrbrr Patapim',
      email: 'patapim@example.com',
      password: hashedPassword,
      cargoId: masterRole.id
    }
  });
  console.log(`Created users`);
}

// Chama a função principal
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
