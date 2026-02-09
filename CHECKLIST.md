# Checklist de Produção

Antes de lançar a aplicação em produção, verifique os seguintes itens para garantir segurança, estabilidade e performance.

## 🚨 Crítico (Bloqueante)

- [ ] **Variáveis de Ambiente**: Todas as variáveis obrigatórias (`DATABASE_URL`, `JWT_SECRET`) estão definidas no ambiente de produção.
- [ ] **JWT Secret**: O `JWT_SECRET` é uma string longa, aleatória e segura (não use '123456' ou valores padrão).
- [ ] **Banco de Dados**: Migrações (`prisma migrate deploy`) foram aplicadas com sucesso no banco de produção.
- [ ] **Build**: O comando `npm run build` executa sem erros.
- [ ] **Testes**: O pipeline de CI (`npm run test`) passou com sucesso.
- [ ] **HTTPS**: O domínio está configurado com SSL/TLS (HTTPS).

## 🔒 Segurança

- [ ] **Admin Secret**: A variável `ADMIN_SECRET` está definida para proteger o endpoint de diagnóstico.
- [ ] **Headers de Segurança**: Headers HTTP seguros estão configurados (via next.config.js ou middleware, se aplicável).
- [ ] **Dados Sensíveis**: Nenhum dado sensível (chaves, senhas) foi commitado no código-fonte.

## 🚀 Performance & UX

- [ ] **Imagens**: Imagens pesadas estão otimizadas ou usando `next/image`.
- [ ] **Loading States**: As páginas principais possuem estados de carregamento (`loading.tsx`) funcionais.
- [ ] **Empty States**: Listas vazias (produtos, agendamentos) exibem mensagens amigáveis ao usuário.
- [ ] **Erro 404/500**: Páginas de erro customizadas estão funcionando.

## 📊 Operação

- [ ] **Logs**: O sistema de logs está capturando erros (stdout/stderr).
- [ ] **Monitoramento**: O endpoint `/api/health` está sendo monitorado por um serviço de uptime (ex: UptimeRobot).
- [ ] **Backup**: Rotina de backup do banco de dados está configurada.

## 📝 Documentação

- [ ] **README**: O README está atualizado com instruções básicas.
- [ ] **DEPLOY.md**: Procedimentos de deploy estão documentados.
