/*
  Warnings:

  - A unique constraint covering the columns `[symbol]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Company_symbol_key" ON "Company"("symbol");
