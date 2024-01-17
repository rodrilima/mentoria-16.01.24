"use server";

import { prisma } from "@/services/prisma";

export interface IPagamentosFilter {
  ano?: number;
  numeroDoPagamento?: number;
}

export async function searchPagamentos(filter: IPagamentosFilter) {
  const result = await prisma.pagamento.findMany({
    where: {
      ano: filter.ano,
      numeroDoPagamento: filter.numeroDoPagamento,
    },
  });

  return JSON.stringify({
    data: result,
  });
}
