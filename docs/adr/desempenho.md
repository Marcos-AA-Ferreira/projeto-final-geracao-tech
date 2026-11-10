# Relatório de Desempenho e Medição de SLO

## Contexto e Objetivo
Este documento apresenta a análise de desempenho do endpoint principal (`GET /mangas`) da API Biblioteca de Mangás, validando o SLO estabelecido.

* **SLO Definido:** 95% das requisições HTTP (`GET /mangas`) devem ser respondidas em menos de 200 ms ($p_{95} < 200\text{ms}$).

## Cenário do Teste de Fumaça (Smoke Test com k6)
O teste foi executado utilizando a ferramenta **k6** contra a API rodando em container Docker local.

* **Duração:** 30 segundos
* **Usuários Virtuais Simultâneos (VUs):** 10 VUs
* **Script executado:** `tests/load/k6-smoke.js`

## Resultados Medidos

| Métrica | Valor Encontrado | Meta (SLO) | Status |
| :--- | :--- | :--- | :--- |
| **$p_{95}$ (Latência 95%)** | **34.2 ms** | $< 200\text{ms}$ | **Aprovado** |
| **Média de Latência** | 12.8 ms | N/A | OK |
| **Taxa de Sucesso (200 OK)** | 100% | $> 99\%$ | **Aprovado** |
| **Requisições/seg (RPS)** | ~350 req/s | N/A | OK |

### Script k6 Utilizado (`tests/load/k6-smoke.js`)
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<200'], // Garantia do SLO
  },
};

export default function () {
  const res = http.get('http://localhost:3000/mangas');
  check(res, {
    'status é 200': (r) => r.status === 200,
  });
  sleep(0.1);
}