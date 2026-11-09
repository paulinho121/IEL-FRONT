# Digital Store

Loja virtual desenvolvida em **React + TypeScript** como projeto final do módulo de Front-end da Digital College. O projeto segue a [documentação oficial da Digital Store](https://github.com/digitalcollegebr/projeto-digital-store) e o [design do Figma (Drip Store)](https://www.figma.com/design/nUk0ihM3x4u8JQtxUoAEJf/DRIP-STORE---DIGITAL-COLLEGE--Copy-?node-id=22-30&p=f).

🔗 **Projeto no ar:** https://iel-front.vercel.app

## Equipe

- Paulo Fernando (trabalho individual)

## Tecnologias

- [React 19](https://react.dev/) com TypeScript
- [Vite](https://vite.dev/) para desenvolvimento e build
- [React Router DOM](https://reactrouter.com/) para as rotas
- [Tailwind CSS 4](https://tailwindcss.com/) para o estilo, com a paleta da documentação configurada como tema
- [Lucide](https://lucide.dev/) para ícones de interface (lupa, menu, setas)

## Como rodar o projeto

Pré-requisito: [Node.js](https://nodejs.org/) 20 ou mais recente.

```bash
git clone https://github.com/paulinho121/IEL-FRONT.git
cd IEL-FRONT
npm install
npm run dev
```

O projeto abre em http://localhost:3000.

Outros comandos:

| Comando           | O que faz                                          |
| ----------------- | -------------------------------------------------- |
| `npm run build`   | Checa os tipos e gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente o build de produção               |
| `npm run lint`    | Roda a checagem de tipos do TypeScript             |

## Páginas e rotas

| Rota            | Página                  | O que tem                                                                 |
| --------------- | ----------------------- | ------------------------------------------------------------------------- |
| `/`             | `HomePage`              | Slide de imagens, coleções em destaque e 8 produtos em alta               |
| `/products`     | `ProductListingPage`    | Ordenação, filtros e listagem; recebe a busca do cabeçalho em `?filter=`  |
| `/produtos`     | —                       | Redireciona para `/products` (a documentação cita as duas rotas)          |
| `/product/:id`  | `ProductViewPage`       | Galeria com miniaturas, buy box com opções e produtos recomendados        |

Todas as páginas usam o componente `Layout`, que envolve o conteúdo (`children`) com o `Header` e o `Footer`.

## Estrutura de pastas

```
src/
├── assets/            # SVGs da documentação (logos, setas, redes sociais, carrinho, estrela)
├── components/
│   ├── BuyBox/        # Nome, referência, avaliação, preços, descrição e botão Comprar
│   ├── FilterGroup/   # Grupo de checkboxes ou radios (props: title, inputType, options)
│   ├── Footer/
│   ├── FooterInformations/  # Lista de links do rodapé (props: title, informations)
│   ├── Gallery/       # Slide com setas, miniaturas opcionais (showThumbs) e bolinhas
│   ├── Header/        # Logo, busca, Cadastre-se/Entrar, carrinho e navegação com NavLink
│   ├── Logo/
│   ├── ProductCard/
│   ├── ProductListing/
│   ├── ProductOptions/ # Tamanhos e cores (props: options, shape, type, radius)
│   ├── ScrollToTop/
│   └── Section/       # Título com alinhamento, link opcional e children
├── data/products.ts   # Produtos de exemplo e opções de filtro
├── pages/             # Layout, HomePage, ProductListingPage, ProductViewPage, NotFoundPage
├── utils/formatPrice.ts
├── App.tsx            # Rotas
└── main.tsx
```

## Funcionalidades

- **Busca:** o campo do cabeçalho busca ao clicar na lupa ou apertar Enter e leva para `/products?filter=termo`. A busca ignora acentos e maiúsculas.
- **Navegação:** o link da página atual fica destacado com a cor primária e sublinhado (`NavLink`).
- **Ordenar por:** menor preço ou maior preço, considerando o preço com desconto.
- **Filtrar por:** marca, categoria e gênero (checkbox) e estado (radio). O título da seção mostra o total de produtos encontrados.
- **Galeria:** desliza entre imagens pelas setas, que ficam desabilitadas na primeira e na última imagem. As miniaturas trocam a imagem em destaque e a selecionada ganha borda de 2px na cor primária.
- **Opções do produto:** tamanhos (quadrado com texto) e cores (círculo preenchido); a opção escolhida ganha borda na cor primária.
- **Responsivo:** layout adaptado para celular, com menu lateral e filtros recolhíveis.

## Deploy

O deploy é feito na [Vercel](https://vercel.com/), ligada a este repositório: cada push no `main` publica uma nova versão. O arquivo `vercel.json` redireciona todas as rotas para o `index.html`, para que links como `/product/2` funcionem ao recarregar a página.
