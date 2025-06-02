/*
  Warnings:

  - You are about to drop the column `month` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Expense` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADIM', 'USER');

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "month",
DROP COLUMN "year";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
