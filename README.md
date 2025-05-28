
# API de Despesas Pessoais

Uma API RESTful para gerenciar despesas pessoais de um usuário, construída com NestJS, Prisma ORM e PostgreSQL.

---

## 🚀 Tecnologias

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Banco de Dados**: PostgreSQL
- **Validação**: `class-validator` + `class-transformer`
- **Documentação** : Swagger (`@nestjs/swagger`)
- **Autenticação** : JWT

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) v16+
- [Yarn](https://yarnpkg.com/) ou npm
- Banco de dados PostgreSQL rodando localmente ou remotamente

---

## 🔧 Instalação

1. **Clone este repositório**
   ```bash
   git clone https://github.com/Matheus-TC-Mourao/api-despesas-pessoais.git
   cd api-despesas-pessoais


2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure variáveis de ambiente**
   Crie um arquivo `.env` na raiz do projeto:

   ```dotenv
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
   JWT_SECRET="sua_chave_secreta"
   ```

---

## 🛠️ Banco de Dados & Migrations

1. **Gerar e aplicar migrações**

   ```bash
   npx prisma migrate dev --name init
   ```

2. **(Opcional) Gerar client do Prisma**

   ```bash
   npx prisma generate
   ```

3. **(Opcional) Inspecionar o banco**

   ```bash
   npx prisma studio
   ```

---

## 🚨 Executando a API

* Em modo de desenvolvimento:

  ```bash
  npm run start:dev
  ```

A API estará disponível por padrão em `http://localhost:3000/expenses`.

---

## 📄 Documentação Swagger

Para visualizar toda a documentação interativa dos endpoints, acesse:

```
http://localhost:3000/api
```

---
## 🚦 Rotas e Exemplos de Body

| Método | Rota                   | Descrição                            | Body Exemplo (JSON)                                         |
|--------|------------------------|--------------------------------------|-------------------------------------------------------------|
| GET    | `/expenses`            | Lista todas as despesas              | —                                                           |
| GET    | `/expenses/:id`        | Busca uma despesa pelo ID            | —                                                           |
| POST   | `/expenses`            | Cria uma nova despesa                | {<br>"title": "Almoço no restaurante",<br>  "amount": 45.50,<br>  "category": "ALIMENTACAO",<br>  "date": "2026-12-28T14:36:03.033Z"<br>} |
| PATCH    | `/expenses/:id`        | Atualiza os dados de uma despesa     | {<br>  "title": "Talheres",<br>  "amount": 60.00,<br>  "category": "CASA",<br>  "date": "2026-12-28T14:36:03.033Z"<br>} |
| DELETE | `/expenses/:id`        | Remove uma despesa                   | —                                                           |

> **Observação:**
> - Os endpoints que recebem body esperam `Content-Type: application/json`.
> - Campos obrigatórios em POST/PUT: `title` (string), `amount` (number), `category` (Category), `date` (YYYY-MM-DDTHH:mm:ss.sssZ).

---



