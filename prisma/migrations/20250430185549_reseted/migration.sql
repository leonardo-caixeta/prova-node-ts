-- CreateEnum
CREATE TYPE "statusBillet" AS ENUM ('PENDING', 'PAID', 'CANCELED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billet" (
    "id" SERIAL NOT NULL,
    "valueToPay" DOUBLE PRECISION NOT NULL,
    "status" "statusBillet" NOT NULL DEFAULT 'PENDING',
    "payDay" TIMESTAMP(3) NOT NULL,
    "dayUserPaid" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Billet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billet" ADD CONSTRAINT "Billet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
