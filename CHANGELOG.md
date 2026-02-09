# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.0.0] - 2026-02-08

### Adicionado

- **Pipeline de CI**: Configuração do GitHub Actions para Lint, Typecheck e Testes Automatizados.
- **Healthcheck & Diagnóstico**: Endpoints `/api/health` e `/api/diagnose` para monitoramento da aplicação.
- **Empty States**: Telas amigáveis para listas vazias em Produtos, Agendamentos e Vendas.
- **Loading States**: Skeletons e animações de carregamento para melhor UX.
- **Documentação**: Guias de Deploy (`DEPLOY.md`) e Checklist de Produção (`CHECKLIST.md`).

### Melhorado

- **Tratamento de Erros**:
  - Implementação de `withErrorHandling` para padronizar respostas de Server Actions.
  - Mensagens de erro mais claras e amigáveis ao usuário final.
  - Logs de erro estruturados para facilitar debugging.
- **Segurança e Tipagem**:
  - Remoção rigorosa do uso de `any` em favor de tipagem estrita (`unknown`, interfaces).
  - Validação de tipos no pipeline de CI.
- **Testes**:
  - Correção e estabilização da suíte de testes (Vitest).
  - Mocking adequado de dependências externas (Prisma, Jose, Email).

### Corrigido

- Falhas em testes de agendamento e autenticação.
- Erros de linting e violações de regras do TypeScript.
- Bugs visuais em formulários e listagens.
