# 📚 API Biblioteca de Mangás (Projeto B)

API REST desenvolvida em **TypeScript** (Node.js) para gerenciamento completo (CRUD) de bibliotecas pessoais de mangás. O projeto segue os princípios **SOLID** (*Repository Pattern*), é conteinerizado via **Docker** e possui pipeline de CI/CD automatizado.

[![CI Pipeline](https://github.com/Marcos-AA-Ferreira/projeto-final-geracao-tech/actions/workflows/ci.yml/badge.svg)](https://github.com/Marcos-AA-Ferreira/projeto-final-geracao-tech/actions/workflows/ci.yml)

> 🔗 **Link do CI Verde:** [Execuções do GitHub Actions](https://github.com/Marcos-AA-Ferreira/projeto-final-geracao-tech/actions)

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** TypeScript / Node.js
- **Framework HTTP:** Express
- **Testes:** Vitest (unitários) e Supertest (integração)
- **Containerização:** Docker & Docker Compose
- **Qualidade & CI:** ESLint, Gitleaks, GitHub Actions
- **Observabilidade:** Pino (logs) e Prom-client (métricas)
- **Carga & Docs:** k6, OpenAPI 3.0 (YAML)

---

## 🛣️ Rotas da API (CRUD Completo)

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `http://localhost:3000/health` | Verifica a saúde da API |
| `GET` | `http://localhost:3000/mangas` | Lista todos os mangás cadastrados |
| `POST` | `http://localhost:3000/mangas` | Cadastra um novo mangá |
| `GET` | `http://localhost:3000/mangas/:id` | Busca um mangá específico por ID |
| `PUT` | `http://localhost:3000/mangas/:id` | Atualiza os dados de um mangá |
| `DELETE` | `http://localhost:3000/mangas/:id` | Remove um mangá da base |

---

## 🚀 Como Subir a Aplicação (Docker)

Certifique-se de ter o **Docker** instalado.

1. Suba o container com **1 único comando**:
   ```bash
   docker compose up --build