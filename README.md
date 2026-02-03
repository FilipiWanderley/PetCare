# 🐾 Pet Care - Plataforma Completa de Serviços Pet

Bem-vindo ao repositório do projeto **Pet Care**! Esta é uma aplicação web completa, moderna e responsiva para clínicas veterinárias e pet shops, integrando serviços de agendamento com e-commerce de produtos pet. O projeto foi evoluído para uma aplicação Full-Stack funcional com persistência de dados em banco de dados PostgreSQL (Neon) via Prisma ORM.

## 🛠️ Tecnologias Utilizadas

- **Next.js 16**: Framework React de última geração com Server Components, App Router e Server Actions.
- **React 19**: Biblioteca para construção de interfaces interativas e reativas.
- **TypeScript**: Tipagem estática robusta para segurança e manutenibilidade do código.
- **Prisma ORM (v6)**: ORM moderno para Node.js e TypeScript, garantindo type-safety nas queries.
- **Neon (PostgreSQL)**: Banco de dados relacional serverless.
- **Zod**: Validação de schema e dados (TypeScript-first).
- **CSS Modules**: Estilização modular e escalável.
- **Context API**: Gerenciamento de estado global para Carrinho e Autenticação.
- **JWT & Bcrypt**: Autenticação segura e hash de senhas.

## ✅ Funcionalidades Implementadas

### 1. Backend e Persistência de Dados 🗄️
- **Integração com Banco de Dados**: Persistência real de dados (Usuários, Pets, Agendamentos, Produtos, Serviços, Depoimentos) utilizando PostgreSQL.
- **Server Actions**: Operações CRUD executadas diretamente no servidor, garantindo segurança e performance.
- **Autenticação Segura**: Login e Cadastro com validação, hash de senhas e sessões via JWT.
- **Optimistic Updates**: Interface reativa que antecipa o sucesso das operações para melhor UX.
- **Seeding Automático**: Povoamento inicial do banco de dados com produtos e serviços padrão.

### 2. E-commerce e Carrinho de Compras 🛒
- **Catálogo Dinâmico**: Produtos carregados diretamente do banco de dados.
- **Carrinho Inteligente**: 
  - Adição e remoção de itens.
  - Controle de quantidade (+/-).
  - Cálculo automático de subtotal e total.
  - Persistência local (em processo de migração para o servidor).

### 3. Dashboard Administrativo 📊
- **Visão Geral**: Painel para administradores/gestores.
- **Estatísticas em Tempo Real**: Receita, Vendas e Agendamentos baseados em dados reais.
- **Gestão de Agendamentos**: Visualização e gerenciamento de status (Pendente/Confirmado/Cancelado).

### 4. Sistema de Agendamento 📅
- **Formulário Integrado**: Agendamento vinculado a usuários registrados ou convidados.
- **Validações**: Verificação de disponibilidade e dados obrigatórios.
- **Meus Agendamentos**: Área para o usuário visualizar seu histórico.

### 5. Interface e Experiência do Usuário (UI/UX) ✨
- **Design Responsivo**: Otimizado para Mobile, Tablet e Desktop.
- **Feedback Visual**: Toasts e mensagens de erro/sucesso claras.
- **Performance**: Carregamento paralelo de dados e otimização de imagens.

### 6. Fluxo de Registro e Confirmação 📧
- **Cadastro Completo**: Validação de e-mail e requisitos de senha fortes.
- **Confirmação por E-mail**: Sistema de verificação com token único enviado por e-mail.
- **Segurança Reforçada**: Acesso bloqueado até a confirmação do e-mail.

## 🚀 Como Rodar o Projeto

### Configuração em Produção (Vercel)

Para popular o banco de dados em produção, acesse a seguinte rota após o deploy:
`https://seu-dominio.vercel.app/api/seed?secret=petcare-setup`

Para rodar o projeto localmente:

1.  **Clone o repositório e instale as dependências:**
    ```bash
    npm install
    ```

2.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto com a URL do seu banco de dados e chaves de segurança:
    ```env
    DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
    JWT_SECRET="sua_chave_secreta_aqui"
    
    # Configuração de E-mail (Gmail - Recomendado para Testes Reais)
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=465
    SMTP_USER=seu-email@gmail.com
    SMTP_PASS=sua-senha-de-app-google # Gerar em: myaccount.google.com/apppasswords
    
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

3.  **Configure o Banco de Dados:**
    Execute as migrações para criar as tabelas e gerar o cliente Prisma:
    ```bash
    npx prisma migrate dev --name init
    ```

4.  **Rode os Testes (Opcional):**
    Para validar se o fluxo de autenticação e registro está funcionando corretamente:
    ```bash
    npm test
    ```

5.  **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

6.  **Acesse a aplicação:**
    Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

- `/src/actions`: Server Actions para operações de banco de dados (CRUD).
- `/src/app`: Rotas e páginas da aplicação (App Router).
- `/src/components`: Componentes reutilizáveis (Layout, Features, UI).
- `/src/hooks`: Hooks personalizados (useCart, useAuth, etc.).
- `/src/lib`: Configurações de bibliotecas (Prisma, Auth, Session).
- `/src/types`: Definições de tipos TypeScript.
- `/prisma`: Schema do banco de dados e migrações.
- `/public`: Assets estáticos.

---
*Desenvolvido com carinho para o melhor cuidado do seu pet.* 🐶🐱

<!-- Force redeploy -->
