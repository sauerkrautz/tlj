/*
  Warnings:

  - You are about to alter the column `no_telp` on the `penerbit` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `penerbit` MODIFY `no_telp` INTEGER NOT NULL;
