# 🐾 Pet Care - Plataforma Completa de Serviços Pet

Bem-vindo ao repositório do projeto **Pet Care**! Este é uma aplicação web completa, moderna e responsiva para clínicas veterinárias e pet shops, integrando serviços de agendamento com e-commerce de produtos pet.

## 🛠️ Tecnologias Utilizadas

- **Next.js 16**: Framework React de última geração com Server Components e App Router.
- **React 19**: Biblioteca para construção de interfaces interativas e reativas.
- **TypeScript**: Tipagem estática robusta para segurança e manutenibilidade do código.
- **CSS Modules**: Estilização modular e escalável.
- **Context API**: Gerenciamento de estado global para Carrinho, Autenticação e Agendamentos.
- **LocalStorage**: Persistência de dados no navegador para simular backend.

## ✅ Funcionalidades Implementadas

### 1. E-commerce e Carrinho de Compras 🛒
- **Catálogo de Produtos**: Visualização de produtos com imagens, preços e promoções.
- **Carrinho Inteligente**: 
  - Adição e remoção de itens em tempo real.
  - Controle de quantidade (+/-).
  - Cálculo automático de subtotal e total.
  - Persistência de dados (o carrinho não se perde ao atualizar a página).
  - Badge de notificação no menu com contagem de itens.

### 2. Dashboard Administrativo 📊
- **Visão Geral**: Painel exclusivo para administradores/gestores.
- **Estatísticas em Tempo Real**:
  - Receita Total.
  - Número de Vendas.
  - Ticket Médio.
  - Agendamentos Pendentes/Confirmados.
- **Gestão de Vendas**: Lista detalhada das últimas transações com status e valores.
- **Gestão de Agendamentos**: Visualização centralizada dos pedidos de serviço.

### 3. Sistema de Agendamento 📅
- **Formulário Completo**: Coleta de dados do tutor, pet, serviço desejado e data/hora.
- **Confirmação Visual**: Página de sucesso com resumo do agendamento.
- **Integração**: Os agendamentos realizados aparecem automaticamente no Dashboard.

### 4. Interface e Experiência do Usuário (UI/UX) ✨
- **Design Responsivo**: Otimizado para Mobile, Tablet e Desktop.
- **Menu Dinâmico**: Navegação fluida com menu hambúrguer para mobile.
- **Header Inteligente**: Adapta-se ao contexto (transparente na Home, sólido nas outras páginas).
- **Identidade Visual**: Cores vibrantes, ícones SVG de alta qualidade e tipografia moderna.

## 🚀 Como Rodar o Projeto

Para visualizar o projeto em sua máquina:

1.  Instale as dependências:
    ```bash
    npm install
    ```

2.  Rode o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

3.  Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

- `/src/app`: Rotas e páginas da aplicação (App Router).
- `/src/components`: Componentes reutilizáveis (Layout, Features, UI).
- `/src/hooks`: Hooks personalizados (useCart, useAuth, useSales, useAppointments).
- `/src/lib`: Utilitários e helpers.
- `/public`: Assets estáticos (imagens, ícones).

---
*Desenvolvido com carinho para o melhor cuidado do seu pet.* 🐶🐱
