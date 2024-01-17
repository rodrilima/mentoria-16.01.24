"use client";

import { searchLiquidacoes } from "@/actions/liquidacoes";
import { IPagamentosFilter, searchPagamentos } from "@/actions/pagamento";
import { Liquidacao, Pagamento } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

interface TableProps {}

export default function Table({}: TableProps) {
  const [results, setResults] = useState<Liquidacao[]>([]);
  const [numerosSelect, setNumerosSelect] = useState<number[]>([]);
  const [filters, setFilters] = useState<IPagamentosFilter>({});

  const carregarLiquidacoes = useCallback(async () => {
    const response1 = await searchPagamentos(filters);
    const { data: pagamentos } = JSON.parse(response1);

    let numeroEmpenho;
    if (pagamentos.length === 1) {
      numeroEmpenho = pagamentos[0].numeroEmpenho;
    }

    const response2 = await searchLiquidacoes({ numeroEmpenho });
    const { data: liquidacoes } = JSON.parse(response2);

    setResults(liquidacoes);
  }, [filters]);

  const buscarNumeros = useCallback(async () => {
    const response = await searchPagamentos({ ano: filters.ano });
    const { data: pagamentos } = JSON.parse(response);
    setNumerosSelect(
      pagamentos.map((pagamento: Pagamento) => pagamento.numeroDoPagamento)
    );
  }, [filters]);

  useEffect(() => {
    carregarLiquidacoes();
  }, [carregarLiquidacoes]);

  useEffect(() => {
    buscarNumeros();
  }, [buscarNumeros]);

  return (
    <div>
      <div className="flex gap-2">
        <select
          className="select"
          onChange={(e) => {
            const value = e.target.value;
            setFilters({
              numeroDoPagamento: undefined,
              ano: value ? Number(value) : undefined,
            });
          }}
        >
          <option value="">Ano</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>
        <select
          className="select"
          onChange={(e) => {
            const value = e.target.value;
            setFilters({
              ...filters,
              numeroDoPagamento: value ? Number(value) : undefined,
            });
          }}
        >
          <option value="">Número do Pagamento</option>
          {numerosSelect.map((numero) => (
            <option key={numero}>{numero}</option>
          ))}
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Número do Empenho</th>
            <th>Sequencial</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.numeroEmpenho}</td>
              <td>{result.sequencial}</td>
              <td>{result.valor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
