# Vercel Runbook - Operações & Deploy

Guia operacional focado em ambiente Vercel Serverless.

## 1. Variáveis de Ambiente (Environment Variables)

Configure em **Project Settings > Environment Variables**.

| Variável              | Production (Ambiente Real)             | Preview (Pull Requests/Staging)                |
| --------------------- | -------------------------------------- | ---------------------------------------------- |
| `DATABASE_URL`        | Postgres de Produção (Pooling ativado) | Postgres de Staging/Branch                     |
| `NODE_ENV`            | `production`                           | `production` (sim, Vercel usa prod em preview) |
| `NEXT_PUBLIC_APP_URL` | `https://seu-dominio.com`              | `https://<vercel-generated-url>`               |
| `STRIPE_SECRET_KEY`   | Chave Live (`sk_live_...`)             | Chave Test (`sk_test_...`)                     |
| `CRON_SECRET`         | Chave forte para Cron Jobs             | (Opcional)                                     |

**⚠️ Atenção:**

- Nunca commite arquivos `.env`.
- Após alterar variáveis na Vercel, é necessário **Redeploy** para surtir efeito.

## 2. Migrações de Banco de Dados (Segurança)

Em arquitetura Serverless, migrações devem ser desacopladas da execução da aplicação.

### ✅ Como Rodar (Estratégia Segura)

Adicione ao **Build Command** na Vercel:

```bash
npx prisma migrate deploy && next build
```

_Isso garante que o schema do banco esteja atualizado antes do código novo rodar._

### 🚫 O que NÃO fazer

- **Nunca rode** `prisma migrate dev` em produção (pode resetar dados).
- **Nunca rode** migrações pesadas (alteração de colunas em tabelas gigantes) via Build Command (risco de timeout). Para isso, use conexão direta manual ou GitHub Actions.

## 3. Debugging com Vercel Logs

Acesse a aba **Logs** no Dashboard da Vercel.

### Filtros Essenciais

- **Apenas Erros:** Clique em "Level" -> selecione "Error".
- **Busca por Rastreio:** Copie o `RequestId` (ex: `pdx1::...`) de um erro 500 para ver toda a execução daquela chamada.
- **Slow Queries:** Procure por logs de duração > 1000ms.

### Runtime Logs

- `console.error()`: Aparece marcado em vermelho. Use para exceções tratadas.
- `console.log()`: Use com parcimônia para evitar custos de ingestão de logs.

## 4. Observabilidade & Segurança (Enterprise)

### Rastreabilidade (Tracing)

Todo request recebe um `x-request-id` único (UUID v4) injetado pelo Middleware.

- **Client-Side:** O ID é retornado no header da resposta. Use-o para reportar bugs.
- **Logs:** Busque por este ID nos logs da Vercel para ver todo o ciclo de vida da requisição.

### Headers de Segurança

Configurados em `next.config.ts`, incluem:

- **HSTS:** Força HTTPS.
- **X-Frame-Options:** Previne Clickjacking (SAMEORIGIN).
- **X-Content-Type-Options:** Previne MIME Sniffing.
- **X-XSS-Protection:** Bloqueia XSS refletido.

## 5. Verificação de Healthcheck

Monitore a saúde da aplicação e conectividade com banco de dados.

- **Endpoint:** `GET /api/health`
- **Exemplo de Resposta Sucesso (200 OK):**
  ```json
  {
    "status": "OK",
    "timestamp": "2026-02-09T10:00:00.000Z",
    "checks": { "database": "UP" }
  }
  ```
- **Ação:** Configure um monitor externo (UptimeRobot, BetterUptime) batendo neste endpoint a cada 5 min.

## 5. Checklist de Release (Pré-Deploy)

Copie e verifique antes de mergear para `main`:

- [ ] **Testes:** `npm test` passou localmente?
- [ ] **Build:** `npm run build` rodou sem erros de Type/Lint?
- [ ] **Env Vars:** Novas variáveis foram adicionadas na Vercel (Production)?
- [ ] **Database:** O banco de produção está acessível?
- [ ] **Migrations:** `prisma migrate deploy` foi testado em ambiente de Staging?
- [ ] **Smoke Test:** Após deploy, verificar `/api/health` e login.
