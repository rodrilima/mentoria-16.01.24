-- CreateTable
CREATE TABLE "Pagamento" (
    "id" SERIAL NOT NULL,
    "ano" INTEGER NOT NULL,
    "numeroDoPagamento" INTEGER NOT NULL,
    "empresa" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);
