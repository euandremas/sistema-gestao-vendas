<p align="center">
  <img src="./img/brand/logo-clicsell.png" alt="ClicSell" width="420">
</p>

<p align="center">
  <strong>É só clicar e comprar.</strong>
</p>

A **ClicSell** é uma aplicação web desenvolvida como parte da disciplina **Back-end Development**, com o objetivo de simular um sistema de gestão de vendas e uma experiência de e-commerce.

O projeto reúne catálogo de produtos, pesquisa e filtros, favoritos, carrinho de compras, cálculo de descontos, consulta de CEP, banners responsivos e recursos de acessibilidade e responsividade.

---

## 📌 Sobre o projeto

A aplicação foi desenvolvida utilizando **HTML5, CSS3 e JavaScript**, com separação das responsabilidades em diferentes arquivos JavaScript.

A ClicSell permite ao usuário:

- visualizar produtos;
- pesquisar produtos pelo nome;
- filtrar produtos por categoria;
- ordenar o catálogo;
- adicionar produtos aos favoritos;
- adicionar produtos ao carrinho;
- alterar quantidades no carrinho;
- calcular descontos;
- consultar endereços por CEP;
- alternar entre tema claro e escuro;
- navegar por banners promocionais;
- utilizar a aplicação em dispositivos desktop e mobile.

---

## ✨ Funcionalidades

### 🛍️ Catálogo de produtos

O catálogo apresenta os produtos cadastrados com:

- imagem;
- nome;
- categoria;
- preço;
- botão de compra;
- botão de favorito.

Também estão disponíveis recursos de:

- busca por nome;
- filtro por categoria;
- ordenação por menor preço;
- ordenação por maior preço;
- ordenação alfabética A-Z;
- ordenação alfabética Z-A.

---

### ❤️ Favoritos

Os produtos podem ser adicionados ou removidos da lista de favoritos.

O sistema:

- atualiza o contador de favoritos no cabeçalho;
- mantém o estado visual dos produtos favoritados;
- permite visualizar somente os produtos favoritos.

---

### 🛒 Carrinho de compras

O carrinho é exibido por meio de um painel lateral.

É possível:

- adicionar produtos;
- aumentar a quantidade;
- diminuir a quantidade;
- remover produtos;
- limpar o carrinho;
- acompanhar o valor total da compra.

O contador localizado no cabeçalho é atualizado automaticamente.

---

### 🧮 Calculadora de desconto

A aplicação possui uma calculadora que recebe:

- preço do produto;
- percentual de desconto.

Após o cálculo, são apresentados os valores correspondentes ao desconto e ao preço final.

Também são realizadas validações para impedir valores inválidos.

---

### 📍 Consulta de CEP

O sistema permite informar um CEP e realizar uma consulta por meio de uma **API externa de CEP**.

Quando o CEP é válido, são exibidas informações do endereço retornadas pela API.

A funcionalidade também possui:

- máscara de CEP;
- estado de carregamento;
- tratamento de CEP inválido;
- tratamento de erros na consulta.

---

### 🎞️ Carrossel promocional

A página possui um carrossel de banners da ClicSell com:

- rotação automática;
- navegação manual;
- indicadores de posição;
- animação horizontal entre os banners;
- suporte a swipe em dispositivos móveis;
- imagens específicas para desktop e mobile.

---

### 🌙 Tema claro e escuro

O usuário pode alternar entre os modos:

- claro;
- escuro.

Os componentes da interface acompanham automaticamente o tema escolhido.

As áreas institucionais da ClicSell mantêm sua identidade visual em amarelo e roxo.

---

### 📱 Responsividade

A interface foi preparada para diferentes tamanhos e orientações de tela.

Foram realizados testes em cenários como:

- desktop;
- smartphone em modo retrato;
- smartphone em modo paisagem.

O layout reorganiza:

- cabeçalho;
- banners;
- catálogo;
- formulários;
- carrinho;
- áreas institucionais;
- rodapé.

---

## 🎨 Identidade visual

A identidade da ClicSell utiliza principalmente:

- 🟡 amarelo;
- 🟣 roxo;
- ⚪ branco.

Além da logomarca, foram desenvolvidos elementos específicos para:

- banners desktop;
- banners mobile;
- favicon;
- área institucional;
- entrega;
- compra segura;
- meios de pagamento;
- rodapé.

---

## 🗂️ Estrutura do projeto

```text
SISTEMA-GESTAO-VENDAS/
│
├── assets/
│   └── favicon/
│       ├── favicon-amarelo.ico
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       └── favicon-48x48.png
│
├── css/
│   └── style.css
│
├── img/
│   ├── banners/
│   │   ├── desktop/
│   │   │   ├── entregas.png
│   │   │   ├── frete-gratis.png
│   │   │   └── melhores-produtos.png
│   │   │
│   │   └── mobile/
│   │       ├── entregas-mobile.png
│   │       ├── frete-gratis-mobile.png
│   │       └── melhores-produtos-mobile.png
│   │
│   ├── brand/
│   │   ├── clicsell-horizontal.png
│   │   ├── clicsell-institucional.png
│   │   ├── clicsell-quadrada.png
│   │   └── logo-clicsell.png
│   │
│   ├── institucionais/
│   │   └── melhores-produtos-cta.png
│   │
│   ├── pagamentos/
│   │   ├── checkout-seguro.png
│   │   └── checkout-seguro-mobile.png
│   │
│   └── produtos/
│
├── js/
│   ├── carrinho.js
│   ├── carrossel.js
│   ├── catalogo.js
│   ├── cep.js
│   ├── desconto.js
│   ├── favoritos.js
│   └── main.js
│
├── index.html
└── README.md

🧩 Organização do JavaScript

O JavaScript foi separado por responsabilidade para facilitar a leitura e manutenção do projeto.

Arquivo	Responsabilidade
catalogo.js	Catálogo, busca, filtros e ordenação
favoritos.js	Gerenciamento dos produtos favoritos
carrinho.js	Carrinho, quantidades, remoção e total
carrossel.js	Banners, autoplay, navegação e swipe
desconto.js	Cálculo e validação de descontos
cep.js	Consulta e tratamento de CEP
main.js	Recursos gerais e inicialização da aplicação
🛠️ Tecnologias utilizadas
HTML5
CSS3
JavaScript
API REST para consulta de CEP
Git
GitHub
Visual Studio Code
▶️ Como executar o projeto
1. Clone o repositório
git clone URL_DO_REPOSITORIO
2. Entre na pasta do projeto
cd SISTEMA-GESTAO-VENDAS
3. Abra no Visual Studio Code
code .
4. Execute a aplicação

A aplicação pode ser executada utilizando a extensão Live Server do Visual Studio Code.

Clique com o botão direito sobre:

index.html

e selecione:

Open with Live Server

A aplicação será aberta no navegador, normalmente em um endereço semelhante a:

http://127.0.0.1:5500/index.html
✅ Testes realizados

Antes da finalização foram testados:

carregamento dos arquivos;
carregamento das imagens;
favicon;
catálogo;
pesquisa;
filtros;
ordenação;
favoritos;
carrinho;
cálculo de desconto;
consulta de CEP;
tratamento de erros;
tema claro/escuro;
carrossel;
navegação por swipe;
links internos;
responsividade;
visualização desktop;
visualização mobile em retrato;
visualização mobile em paisagem;
console do navegador;
requisições pela aba Network.
♿ Acessibilidade

O projeto utiliza recursos como:

textos alternativos em imagens;
aria-label;
aria-labelledby;
aria-hidden;
aria-live;
aria-pressed;
estados de foco;
elementos semânticos como header, main, section, nav, aside e footer.
🎯 Objetivo acadêmico

Projeto desenvolvido para a disciplina Back-end Development.

A atividade tem como objetivo aplicar conceitos de desenvolvimento web, organização de código JavaScript, manipulação de dados, interação com o usuário e consumo de API externa.

🎥 Vídeo de apresentação

Demonstração da aplicação:

YouTube:
LINK_DO_VIDEO_AQUI

🔗 Repositório

GitHub:
https://github.com/euandremas/sistema-gestao-vendas

👨‍💻 Autor

André Moreira Araújo dos Santos

Projeto acadêmico desenvolvido durante o curso de Análise e Desenvolvimento de Sistemas.

© 2026 ClicSell — É só clicar e comprar.