# 🐾 Pet Care Platform

Plataforma completa para gestão de serviços de Pet Care, desenvolvida com foco em **qualidade de produção**, **segurança**, **observabilidade** e **arquitetura escalável**.

Este projeto foi construído como um **MVP production-ready**, seguindo padrões reais de mercado (CI/CD, validação de ambiente, tratamento de erros tipado, arquitetura serverless e documentação operacional).

---

## 🎯 Objetivo do Projeto

Demonstrar a construção de uma aplicação moderna **pronta para produção**, indo além de “funcionar”, com atenção especial a:

- Confiabilidade
- Previsibilidade
- Manutenibilidade
- Experiência do usuário
- Operação em ambiente real (Vercel)

Este repositório também funciona como **cartão de visitas técnico**.

---

## ✨ Funcionalidades

- Autenticação segura com confirmação por e-mail
- Gestão de Pets
- Agendamento de serviços
- Carrinho e dashboard
- Integração com pagamentos (Stripe)
- API protegida com controle administrativo
- Healthcheck para monitoramento
- Observabilidade e logs estruturados

---

## 🧠 Decisões Técnicas (Diferenciais)

Este projeto foi desenhado com mentalidade de **ambiente enterprise**.

### 🔐 Tratamento de Erros Tipado

- Catálogo central de erros (`ERROR_CATALOG`)
- Cada erro possui:
  - código estável
  - mensagem segura
  - status HTTP consistente
  - `message_key` preparado para i18n
- Testes validam **código**, não texto

### 🚦 Validação de Ambiente (Fail-Fast)

- A aplicação **não inicia** se variáveis críticas estiverem ausentes ou inválidas
- Validação feita com Zod no startup

### ☁️ Arquitetura Serverless (Vercel)

- Prisma configurado com padrão Singleton
- PostgreSQL (Neon / Vercel Postgres)
- Estratégia segura de migrations documentada

### 📊 Observabilidade

- Logs estruturados em produção (JSON)
- `x-request-id` propagado por request
- Healthcheck real validando dependências

### 🔁 CI/CD com Quality Gates

- Nenhum código entra sem:
  - lint
  - typecheck
  - testes
  - validação do Prisma

---

## 🏗️ Arquitetura Geral

```
Client (Next.js App Router)
   │
   ├── Server Actions (Business Logic)
   │       └── withErrorHandling
   │
   ├── API Routes (/api)
   │       ├── health
   │       ├── seed
   │       ├── diagnose
   │       └── webhooks
   │
   ├── Prisma ORM
   │       └── PostgreSQL
   │
   └── Serviços Externos
           ├── Email Provider
           └── Stripe
```

---

## 📂 Organização de Pastas

```
src/
├── app/                 # Rotas, layouts e pages
│   ├── api/             # API Routes (health, seed, diagnose, webhooks)
│   └── (pages)/         # Páginas da aplicação
│
├── actions/             # Server Actions (camada de negócio)
│
├── lib/                 # Infraestrutura e utilitários
│   ├── db.ts            # Prisma client (serverless-safe)
│   ├── env.ts           # Validação de variáveis de ambiente
│   ├── errors.ts        # ERROR_CATALOG + AppError
│   ├── logger.ts        # Logs estruturados
│   └── exceptions.ts    # withErrorHandling
│
├── tests/               # Testes automatizados (Vitest)
│
└── prisma/
    ├── schema.prisma    # Schema do banco
    └── migrations/      # Migrations versionadas
```

---

## 🚀 Setup Local

1. Clonar o repositório

```bash
git clone https://github.com/FilipiWanderley/PetCare.git
cd PetCare
```

2. Instalar dependências

```bash
npm install
```

3. Configurar variáveis de ambiente  
   Crie um `.env` baseado em `.env.example`.

4. Rodar migrations

```bash
npx prisma migrate dev
```

5. Rodar a aplicação

```bash
npm run dev
```

---

## 🧪 Testes

```bash
npm run test
```

- Testes cobrem fluxos críticos:
  - Auth
  - Agendamentos
  - Carrinho
  - Dashboard

---

## 🩺 Healthcheck

```http
GET /api/health
```

- Verifica conectividade real com o banco
- Retorna `200` se saudável

---

## 🔐 Segurança

- Nenhum segredo hardcoded
- Rotas sensíveis protegidas via `x-admin-secret`
- Seed e diagnose protegidos em produção
- Erros não vazam stack ou detalhes internos

---

## 📦 Deploy (Vercel)

- Ambiente serverless
- PostgreSQL (Neon / Vercel Postgres)
- Migrations via `prisma migrate deploy`
- Logs via Vercel Logs
- CI bloqueia builds quebrados

---

## ⚠️ Riscos Conhecidos (Serverless)

- Cold start inicial (1–2s)
- Dependência de Webhooks (Stripe)
- Limites de conexão sem pooling

Todos documentados e mitigados.

---

## 👨‍💻 Autor

Filipi Moraes  
Backend / Full Stack Engineer  
Foco em aplicações robustas, escaláveis e prontas para produção.
