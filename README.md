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
``` 
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

https://youtu.be/4mIWlSFUZBs

🔗 Repositório

GitHub:
https://github.com/euandremas/sistema-gestao-vendas


## 🌐 Aplicação online

Acesse a ClicSell pelo GitHub Pages:

https://euandremas.github.io/sistema-gestao-vendas/

---

# 🚀 Atividade 2 — Evolução Back-end

Na Atividade 2, a ClicSell foi evoluída a partir do projeto desenvolvido na Atividade 1, adicionando recursos de back-end com Node.js, Programação Orientada a Objetos, persistência em arquivos JSON e operações assíncronas.

O front-end desenvolvido anteriormente foi preservado e integrado à nova estrutura de dados do projeto.

## 🆕 Funcionalidades adicionadas

Nesta etapa foram implementados:

- back-end com Node.js;
- menu interativo no terminal;
- cadastro de produtos pelo terminal;
- listagem de produtos cadastrados;
- cálculo da média de preços;
- criação e listagem de pedidos;
- persistência de produtos em JSON;
- persistência de pedidos em JSON;
- integração do catálogo front-end com o arquivo de produtos;
- consulta de CEP pelo back-end;
- integração do endereço consultado ao pedido;
- validação de preço;
- validação de quantidade;
- validação de CEP;
- tratamento de erros;
- uso de Promises e Async/Await;
- Programação Orientada a Objetos;
- herança e polimorfismo.

## 🏗️ Estrutura adicionada na Atividade 2

```text
SISTEMA-GESTAO-VENDAS/
│
├── backend/
│   ├── models/
│   │   ├── Entidade.js
│   │   ├── Produto.js
│   │   └── Pedido.js
│   │
│   ├── services/
│   │   ├── cepService.js
│   │   ├── produtoService.js
│   │   └── pedidoService.js
│   │
│   ├── utils/
│   │   └── arquivo.js
│   │
│   └── app.js
│
├── data/
│   ├── produtos.json
│   └── pedidos.json
│
├── css/
├── img/
├── js/
├── index.html
├── package.json
└── README.md
```

▶️ Executando o back-end
Pré-requisitos

É necessário possuir o Node.js instalado.

A versão utilizada durante o desenvolvimento foi:

Node.js v22.18.0
npm 10.9.3
Iniciar o back-end

Na raiz do projeto, execute:

```bash
npm start
```

O comando executa:

```bash
node backend/app.js
```
```text    
================================
       ClicSell - Back-end
================================


1 - Cadastrar produto
2 - Listar produtos
3 - Calcular média de preços
4 - Criar pedido
5 - Listar pedidos
6 - Consultar CEP
0 - Sair
```

📦 Gerenciamento de produtos

Os produtos são persistidos no arquivo:

data/produtos.json

Através do terminal é possível:

cadastrar um novo produto;
listar os produtos cadastrados;
calcular a média dos preços.

Ao cadastrar um produto, um novo ID é gerado automaticamente e os dados são persistidos no arquivo JSON.

🔄 Integração front-end e back-end

O catálogo da ClicSell deixou de utilizar uma lista de produtos fixa diretamente no JavaScript.

O arquivo:

js/catalogo.js

carrega os produtos de:

data/produtos.json

utilizando fetch e async/await.

O fluxo ficou:

```text
Terminal Node.js
      ↓
Cadastro de produto
      ↓
produtoService.js
      ↓
data/produtos.json
      ↓
fetch() no front-end
      ↓
Catálogo da ClicSell
```

Dessa forma, um produto cadastrado pelo terminal passa a fazer parte da fonte de dados utilizada pelo catálogo da aplicação.

🧱 Programação Orientada a Objetos

Foi criada a classe base:

Entidade

As classes:

Produto
Pedido

herdam de Entidade.

Estrutura:
```text 
Entidade
├── Produto
└── Pedido
```
As duas classes implementam o método:

`obterResumo()`

com comportamentos diferentes.

Isso demonstra o uso de polimorfismo, pois o mesmo método possui implementações específicas de acordo com o tipo do objeto.

✅ Validações
Produto

São validados:

nome obrigatório;
categoria obrigatória;
preço numérico;
preço maior que zero.
Pedido

São validados:

nome do cliente;
existência de produtos;
preço dos itens;
quantidade inteira;
quantidade maior que zero.
CEP

São validados:

quantidade de dígitos;
CEP existente;
resposta da API externa.

Dados inválidos não são persistidos nos arquivos JSON.

📍 Consulta de CEP no back-end

A consulta de CEP também foi implementada no Node.js utilizando:

`fetch()`
`async/await`

O serviço está localizado em:

backend/services/cepService.js

Quando um pedido é criado, o CEP de entrega é consultado e o endereço retornado é armazenado junto ao pedido.

Exemplo:

```json
{
  "endereco": {
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "cidade": "São Paulo",
    "uf": "SP"
  }
}
```

💾 Persistência de dados

A leitura e escrita dos arquivos utiliza o módulo nativo:

`fs/promises`

As operações são assíncronas e utilizam async/await.

Os dados são persistidos em:

`data/produtos.json`
`data/pedidos.json`

🧾 Pedidos

Pelo terminal é possível criar pedidos escolhendo:

cliente;
produto;
quantidade;
CEP de entrega.

O sistema calcula automaticamente o valor total e salva o pedido no arquivo JSON.

Também é possível listar todos os pedidos cadastrados através do menu.

🧪 Testes realizados na Atividade 2

Foram testados:

inicialização do Node.js;
execução através de npm start;
cadastro de produto válido;
bloqueio de produto com preço inválido;
listagem de produtos;
cálculo da média de preços;
persistência dos produtos;
criação de pedido válido;
bloqueio de quantidade zero;
bloqueio de quantidade decimal;
persistência dos pedidos;
listagem dos pedidos;
consulta de CEP válido;
consulta de CEP com quantidade inválida de dígitos;
consulta de CEP inexistente;
integração do CEP ao pedido;
tratamento de erros sem encerramento da aplicação;
carregamento do catálogo através do JSON;
cadastro de produto pelo terminal e exibição no front-end.
🛠️ Tecnologias adicionadas nesta etapa
Node.js
npm
JavaScript
JSON
File System (fs/promises)
Promises
Async/Await
Fetch API
Programação Orientada a Objetos
Git
GitHub

🎯 Objetivo acadêmico da Atividade 2

Esta etapa teve como objetivo evoluir a ClicSell com conceitos de desenvolvimento back-end utilizando Node.js, Programação Orientada a Objetos, armazenamento e manipulação de dados e operações assíncronas.

A implementação utiliza classes, herança, polimorfismo, validações, arquivos JSON, interação via terminal e integração com uma API externa de CEP.

🎥 Vídeo da Atividade 2

[(https://youtu.be/fAvv-jqzh10)](https://youtu.be/fAvv-jqzh10)

🌿 Desenvolvimento com Git

A Atividade 2 foi desenvolvida em uma branch específica:

`atividade-2`

A branch main permaneceu preservada com a versão entregue da Atividade 1 durante o desenvolvimento desta etapa.

👨‍💻 Autor

André Moreira Araújo dos Santos

Projeto acadêmico desenvolvido durante o curso de Análise e Desenvolvimento de Sistemas.

© 2026 ClicSell — É só clicar e comprar.