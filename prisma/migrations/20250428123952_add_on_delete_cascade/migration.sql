-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cargoId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cargoId_fkey" FOREIGN KEY ("cargoId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
