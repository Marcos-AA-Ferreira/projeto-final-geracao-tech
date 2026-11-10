# 1. Utilização de TypeScript, Repository Pattern e Arquitetura de Domínio Único

* **Status:** Aceito
* **Data:** 2026-11-07

## Contexto e Declaração do Problema
O projeto exige a entrega de uma API de domínio único (Biblioteca de Mangás) conteinerizada via Docker Compose, com cobertura estrita de testes e construída em uma linguagem versátil para múltiplos dispositivos (computador e futuro mobile).

## Opções Consideradas
1. **Node.js com TypeScript** (Fastify / Express)
2. **Python com FastAPI**
3. **Go (Golang)**

## Decisão Escolhida
Opção 1: **Node.js com TypeScript**, utilizando o **Repository Pattern** e os princípios **SOLID**.

### Justificativa
* **Linguagem Única:** Permite o compartilhamento de interfaces e tipos com futuros clientes mobile (React Native/Expo) e desktop (Electron).
* **Repository Pattern (SOLID):** O desacoplamento da lógica de domínio em relação ao mecanismo de persistência permite testar a regra de negócio com extrema facilidade e velocidade através de testes unitários isolados, sem depender de banco de dados ativo.

## Consequências
* **Positivas:**
  * Execução rápida da suíte de testes no CI.
  * Suporte nativo a ferramentas modernas de linting (ESLint) e cobertura (Vitest/v8).
* **Negativas:**
  * Necessidade de etapa de compilação/transpilação (`tsc`/`tsup`) para ambiente de produção.