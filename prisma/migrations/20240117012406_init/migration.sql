/*
  Warnings:

  - Added the required column `numero_empenho` to the `Pagamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pagamento" ADD COLUMN     "numero_empenho" INTEGER NOT NULL;
