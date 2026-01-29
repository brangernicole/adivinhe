# Adivinhe - Word Guessing Game

Um jogo de adivinhação de palavras construído com React, TypeScript e Vite.

## 📋 Descrição

Adivinhe é uma aplicação interativa onde o jogador tenta adivinhar uma palavra letra por letra. O jogo fornece dicas para ajudar o jogador e acompanha as letras já utilizadas.

## 🚀 Tecnologias

- **React** - Biblioteca JavaScript para construir interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Ferramenta de build rápida para aplicações web
- **CSS Modules** - Estilização modular e encapsulada

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button/         # Componente de botão
│   ├── Header/         # Cabeçalho da aplicação
│   ├── Input/          # Campo de entrada
│   ├── Letter/         # Componente de letra individual
│   ├── LettersUsed/    # Exibe letras já utilizadas
│   └── Tip/            # Componente de dica
├── utils/              # Utilitários e constantes
│   └── words.ts        # Lista de palavras do jogo
├── App.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── styles/             # Estilos globais

```

## 🔧 Instalação

1. Clone ou extraia o projeto
2. Instale as dependências:
```bash
npm install
```

## ▶️ Como Executar

Para rodar o servidor de desenvolvimento:
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

Para fazer build para produção:
```bash
npm run build
```

## 🎮 Como Jogar

1. O jogo escolhe uma palavra aleatória da lista
2. Digite uma letra para tentar adivinhar
3. Letras corretas aparecem na palavra
4. Use a dica se precisar de ajuda
5. Acompanhe as letras já utilizadas
6. Vença adivinando a palavra antes de esgotar as tentativas

## 📝 Notas de Desenvolvimento

- Componentes são modularizados e reutilizáveis
- Cada componente possui seus próprios estilos (CSS Modules)
- TypeScript garante type safety em toda a aplicação
- Vite oferece hot module replacement (HMR) para desenvolvimento rápido
