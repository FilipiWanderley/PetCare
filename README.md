# 🐾 Pet Care - Landing Page

Bem-vindo ao repositório do projeto **Pet Care**! Este é um site moderno e responsivo desenvolvido para uma clínica/serviço de cuidados para pets, focado em agendamento de banho, tosa e consultas veterinárias.

## 🛠️ Tecnologias Utilizadas

- **Next.js 16**: Framework React de última geração para alta performance e SEO.
- **React**: Biblioteca para construção de interfaces de usuário interativas.
- **CSS Modules**: Estilização modular para evitar conflitos de CSS e manter o código organizado.
- **TypeScript**: Para tipagem estática e código mais seguro.

## ✅ O Que Já Foi Feito

Nesta etapa do desenvolvimento, focamos na estruturação da **Página Inicial (Home)** e na identidade visual:

### 1. Hero Section (Topo da Página)
- **Título Personalizado:** Ajuste de peso da fonte para destacar "o cuidado que ele merece" e suavizar o início da frase.
- **Identidade Visual:** Implementação de cores da marca (amarelo e preto/cinza escuro) com elementos decorativos (blobs, brilhos).
- **CTA (Call to Action):** Botão "Agendar Agora" em destaque.

### 2. Seção de Serviços
- **Ícones em Alta Definição:** Substituição de imagens PNG por **ícones SVG** (vetoriais), garantindo que não percam qualidade em nenhuma tela.
- **Lista de Serviços:** Adestramento, Alimentação, Veterinário e Banho.

### 3. Seção de Depoimentos (Novo!)
- **Cards de Feedback:** Criação de uma seção dedicada para prova social.
- **Personalização:** Inclusão de fotos, nomes e papéis específicos (ex: "Tutor de gato", "Tutora de cachorro") conforme solicitado.
- **Design:** Layout em grid responsivo com efeitos de hover.

### 4. Estrutura Global
- **Header e Footer:** Integrados ao layout principal (`layout.tsx`), aparecendo em todas as páginas.
- **Fontes:** Configuração da fonte `Inter` via Next.js Fonts.

## 🚧 O Que Falta Fazer / Próximos Passos

Para levar o projeto para o próximo nível ou para produção, sugerimos as seguintes etapas:

1.  **Funcionalidade de Agendamento:**
    - Atualmente, o botão "Agendar" é visual. É necessário conectar a um formulário real, link de WhatsApp ou sistema de agendamento.
    - O componente `AppointmentForm` existe nos arquivos, mas precisa ser integrado à página ou a um modal.

2.  **Revisão de Conteúdo (Header/Footer):**
    - Verificar se os links do menu (Header) e as informações do rodapé (Footer) estão corretos e apontando para os lugares certos.

3.  **Responsividade Fina:**
    - Testar exaustivamente em dispositivos móveis muito pequenos ou monitores ultrawide para garantir que o layout não quebre.

4.  **SEO e Performance:**
    - Adicionar descrições meta reais para o Google.
    - Otimizar carregamento de imagens secundárias se necessário.

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
