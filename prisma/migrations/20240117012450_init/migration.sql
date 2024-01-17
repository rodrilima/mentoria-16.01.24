/*
  Warnings:

  - You are about to drop the column `numero_empenho` on the `Pagamento` table. All the data in the column will be lost.
  - Added the required column `numeroEmpenho` to the `Pagamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pagamento" DROP COLUMN "numero_empenho",
ADD COLUMN     "numeroEmpenho" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Liquidacao" (
    "id" SERIAL NOT NULL,
    "numeroEmpenho" INTEGER NOT NULL,
    "sequencial" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Liquidacao_pkey" PRIMARY KEY ("id")
);
