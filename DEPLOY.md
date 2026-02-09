# Guia de Deploy e Operação - Pet Care App

Este documento descreve os procedimentos para deploy, configuração e operação da aplicação Pet Care.

## Pré-requisitos

- Node.js 18+
- Banco de dados PostgreSQL (Recomendado para produção) ou SQLite (apenas para desenvolvimento/pequena escala)
- Conta na Vercel (Recomendado) ou servidor compatível com Node.js

## Variáveis de Ambiente

As seguintes variáveis de ambiente são obrigatórias em produção:

```env
# Banco de Dados
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# Autenticação
JWT_SECRET="sua-chave-secreta-forte-e-longa-minimo-32-caracteres"

# Aplicação
NODE_ENV="production"
NEXT_PUBLIC_API_URL="https://seu-dominio.com"

# Admin (para endpoint de diagnóstico)
ADMIN_SECRET="chave-secreta-para-diagnostico"
```

## Deploy na Vercel (Recomendado)

1. **Push para o GitHub**: Certifique-se de que seu código está no repositório.
2. **Importar Projeto**: No dashboard da Vercel, importe o repositório.
3. **Configurar Variáveis**: Adicione as variáveis de ambiente listadas acima.
4. **Build Command**: O padrão `next build` é suficiente.
5. **Install Command**: O padrão `npm install` é suficiente.
6. **Deploy**: Clique em Deploy.

### Migrações de Banco de Dados

Ao fazer deploy, certifique-se de aplicar as migrações do Prisma no banco de produção.
No campo "Build Command" da Vercel, você pode alterar para:

```bash
npx prisma migrate deploy && next build
```

Ou rodar manualmente via CLI conectado ao banco de produção.

## Deploy Manual (Docker / Servidor Node)

1. **Build da Aplicação**:

   ```bash
   npm ci
   npm run build
   ```

2. **Executar Migrações**:

   ```bash
   npx prisma migrate deploy
   ```

3. **Iniciar Servidor**:
   ```bash
   npm start
   ```

## Monitoramento e Operação

### Healthcheck

A aplicação possui um endpoint de healthcheck público:

- `GET /api/health`
- Retorna status 200 OK se a aplicação e o banco estiverem respondendo.

### Diagnóstico Avançado

Endpoint protegido para verificar contagem de dados e status detalhado:

- `GET /api/diagnose?secret=SEU_ADMIN_SECRET`

### Logs

- Logs de erro são gerados no console (stdout/stderr).
- Em ambiente de container/Vercel, esses logs são capturados automaticamente pelo agregador de logs.
