import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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

  console.log(`Created roles: ${adminRole.name}, ${userRole.name}`);

  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '12345',
      cargoId: userRole.id
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: '12345',
      cargoId: adminRole.id
    }
  });
  console.log(`Created users: ${user1.name}, ${user2.name}`);
}

// Chama a função principal
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
