"use server";

import { prisma } from "@/services/prisma";

export interface ILiquidacoesFilter {
  numeroEmpenho?: number;
}

export async function searchLiquidacoes(filter: ILiquidacoesFilter) {
  const result = await prisma.liquidacao.findMany({
    where: {
      numeroEmpenho: filter.numeroEmpenho,
    },
  });

  return JSON.stringify({
    data: result,
  });
}
