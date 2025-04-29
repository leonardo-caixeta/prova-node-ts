# 🧩 Prova Node.js + TypeScript

Aplicação backend em Node.js com TypeScript, Prisma ORM e PostgreSQL, com autenticação JWT, autorização RBAC, validações com Joi, testes completos com Jest e Supertest, e estrutura modular.

---

## 🚀 Tecnologias Usadas

- Node.js + TypeScript
- Express 5
- Prisma ORM (PostgreSQL)
- JWT (autenticação)
- Joi (validação)
- Bcrypt (hash de senhas)
- Jest + Supertest (testes)
- ESLint + Prettier (código limpo)
- Nodemon (dev)
- RBAC (controle de acesso por cargo)

---

## 📁 Estrutura

src/  
├── controller/\
├── middleware/\
├── routes/\
├── services/\
├── types/\
├── utils/\
├── index.ts\
test/\
prisma/\
.env

---

## 🔐 Autenticação & Autorização

- JWT em `Bearer Token`
- `authenticateToken`: middleware de autenticação
- `authorizeRoles(...roles)`: validação de acesso por cargo

---

## 📚 Rotas da API

### Login (`/user/login`)

| Método | Rota          | Descrição     | Permissão |
| ------ | ------------- | ------------- | --------- |
| POST   | `/user/login` | Login e token | Público   |

---

### Usuários (`/user`)

| Método | Rota                   | Ação               | Cargos Permitidos   |
| ------ | ---------------------- | ------------------ | ------------------- |
| GET    | `/user`                | Listar todos       | Admin, User, Master |
| GET    | `/user/:id`            | Buscar por ID      | Admin, User, Master |
| GET    | `/user/byEmail/:email` | Buscar por e-mail  | Admin, User, Master |
| POST   | `/user`                | Criar novo usuário | Admin, User, Master |
| PATCH  | `/user/:id`            | Atualizar usuário  | Admin, Master       |
| DELETE | `/user/:id`            | Deletar usuário    | Master              |

---

### Cargos (`/role`)

| Método | Rota                 | Ação             | Cargos Permitidos |
| ------ | -------------------- | ---------------- | ----------------- |
| GET    | `/role`              | Listar todos     | Token válido      |
| GET    | `/role/:id`          | Buscar por ID    | Token válido      |
| GET    | `/role/byName/:name` | Buscar por nome  | Token válido      |
| POST   | `/role`              | Criar novo cargo | Token válido      |
| PATCH  | `/role/:id`          | Atualizar cargo  | Master            |
| DELETE | `/role/:id`          | Deletar cargo    | Master            |

---

## 📦 Instalação e Uso

### 1. Clonar o projeto

```bash
git clone https://github.com/seu-usuario/prova-node_ts-leo.git
cd prova-node_ts-leo
```

---

### 1. Iniciar o projeto

```bash
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```
