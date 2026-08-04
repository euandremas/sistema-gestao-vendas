const themeToggle = document.getElementById("themeToggle");
const themeText = document.getElementById("themeText");

const buscaProdutoInput = document.getElementById("buscaProduto");
const filtroCategoriaSelect = document.getElementById("filtroCategoria");
const ordenacaoProdutosSelect = document.getElementById("ordenacaoProdutos");

const listaProdutos = document.getElementById("listaProdutos");
const textoCatalogo = document.querySelector("#catalogo .sectionHeader p");

const DARK_THEME_CLASS = "darkTheme";
const THEME_STORAGE_KEY = "clicSellTheme";

let toastTimeout;

/* ===========================
   TEMA
=========================== */

function updateThemeControls(isDarkTheme) {
  themeToggle.checked = isDarkTheme;
  themeText.textContent = isDarkTheme ? "Modo claro" : "Modo escuro";
}

function applyTheme(theme) {
  const isDarkTheme = theme === "dark";

  document.body.classList.toggle(DARK_THEME_CLASS, isDarkTheme);

  updateThemeControls(isDarkTheme);
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDarkTheme ? "dark" : "light";
}

themeToggle.addEventListener("change", () => {
  const selectedTheme = themeToggle.checked ? "dark" : "light";

  localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);

  applyTheme(selectedTheme);
});

/* ===========================
   UTILITÁRIOS
=========================== */

function formatarPreco(preco) {
  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/* ===========================
   TOAST
=========================== */

function exibirToast(mensagem) {
  const toast = document.getElementById("toast");

  clearTimeout(toastTimeout);

  toast.textContent = mensagem;
  toast.classList.add("toastVisible");

  toastTimeout = setTimeout(() => {
    toast.classList.remove("toastVisible");
  }, 3000);
}

/* ===========================
   CATÁLOGO
=========================== */

function criarImagemFallback(imagem) {
  const imagemFallback = document.createElement("div");

  imagemFallback.className = "produtoImagemFallback";
  imagemFallback.setAttribute("aria-label", `Imagem indisponível para ${imagem.alt}`);

  imagemFallback.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2"></rect>
      <circle cx="8.5" cy="9" r="1.5"></circle>
      <path d="m4 16 4-4 3 3 2-2 7 7"></path>
    </svg>

    <span>Imagem indisponível</span>
  `;

  imagem.replaceWith(imagemFallback);
}

function criarCardProduto(produto) {
  const card = document.createElement("article");

  card.className = "produtoCard";
  card.dataset.produtoId = produto.id;

  card.innerHTML = `
    <div class="produtoImagemWrapper">
      <img
        class="produtoImagem"
        src="${produto.imagem}"
        alt="${produto.nome}"
      />
    </div>

    <div class="produtoConteudo">
      <span class="produtoCategoria">
        ${produto.categoria}
      </span>

      <h3>${produto.nome}</h3>

      <p class="produtoPreco">
        ${formatarPreco(produto.preco)}
      </p>

      <button
        class="button produtoButton"
        type="button"
        data-produto-id="${produto.id}"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 1.9-1.4L21 8H7"></path>
          <circle cx="10" cy="20" r="1.5"></circle>
          <circle cx="18" cy="20" r="1.5"></circle>
        </svg>

        Comprar
      </button>
    </div>
  `;

  const imagem = card.querySelector(".produtoImagem");

  imagem.addEventListener("error", () => {
    criarImagemFallback(imagem);
  });

  return card;
}

function exibirCatalogoVazio() {
  listaProdutos.innerHTML = `
    <div class="catalogEmpty">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="6"></circle>
        <path d="m16 16 4 4"></path>
      </svg>

      <strong>Nenhum produto encontrado</strong>

      <p>Tente alterar a busca ou selecionar outra categoria.</p>
    </div>
  `;
}

function renderizarProdutos(lista) {
  listaProdutos.classList.remove("catalogPlaceholder");
  listaProdutos.innerHTML = "";

  textoCatalogo.textContent =
    lista.length === 1
      ? "1 produto disponível."
      : `${lista.length} produtos disponíveis.`;

  if (lista.length === 0) {
    exibirCatalogoVazio();
    return;
  }

  lista.forEach((produto) => {
    listaProdutos.appendChild(criarCardProduto(produto));
  });
}

function obterProdutosFiltrados() {
  const termoBusca = normalizarTexto(buscaProdutoInput.value);
  const categoriaSelecionada = filtroCategoriaSelect.value;

  let produtosFiltrados = produtos.filter((produto) => {
    const nomeProduto = normalizarTexto(produto.nome);
    const categoriaProduto = normalizarTexto(produto.categoria);

    const correspondeBusca =
      nomeProduto.includes(termoBusca) || categoriaProduto.includes(termoBusca);

    const correspondeCategoria =
      categoriaSelecionada === "todos" ||
      produto.categoria === categoriaSelecionada;

    return correspondeBusca && correspondeCategoria;
  });

  produtosFiltrados = ordenarProdutos(produtosFiltrados);

  return produtosFiltrados;
}

function ordenarProdutos(lista) {
  const produtosOrdenados = [...lista];

  switch (ordenacaoProdutosSelect.value) {
    case "menorPreco":
      produtosOrdenados.sort((produtoA, produtoB) => produtoA.preco - produtoB.preco);
      break;

    case "maiorPreco":
      produtosOrdenados.sort((produtoA, produtoB) => produtoB.preco - produtoA.preco);
      break;

    case "nomeAsc":
      produtosOrdenados.sort((produtoA, produtoB) =>
        produtoA.nome.localeCompare(produtoB.nome, "pt-BR")
      );
      break;

    case "nomeDesc":
      produtosOrdenados.sort((produtoA, produtoB) =>
        produtoB.nome.localeCompare(produtoA.nome, "pt-BR")
      );
      break;

    default:
      produtosOrdenados.sort((produtoA, produtoB) => produtoA.id - produtoB.id);
  }

  return produtosOrdenados;
}

function atualizarCatalogo() {
  const produtosFiltrados = obterProdutosFiltrados();

  renderizarProdutos(produtosFiltrados);
}

function preencherCategorias() {
  const categorias = [...new Set(produtos.map((produto) => produto.categoria))];

  categorias.sort((categoriaA, categoriaB) =>
    categoriaA.localeCompare(categoriaB, "pt-BR")
  );

  categorias.forEach((categoria) => {
    const option = document.createElement("option");

    option.value = categoria;
    option.textContent = categoria;

    filtroCategoriaSelect.appendChild(option);
  });
}

function selecionarProduto(event) {
  const botaoComprar = event.target.closest(".produtoButton");

  if (!botaoComprar) {
    return;
  }

  const produtoId = Number(botaoComprar.dataset.produtoId);

  const produtoSelecionado = produtos.find(
    (produto) => produto.id === produtoId
  );

  if (!produtoSelecionado) {
    return;
  }

  exibirToast(`${produtoSelecionado.nome} foi selecionado.`);
}

/* ===========================
   EVENTOS
=========================== */

buscaProdutoInput.addEventListener("input", atualizarCatalogo);
filtroCategoriaSelect.addEventListener("change", atualizarCatalogo);
ordenacaoProdutosSelect.addEventListener("change", atualizarCatalogo);

listaProdutos.addEventListener("click", selecionarProduto);

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getInitialTheme());
  preencherCategorias();
  renderizarProdutos(produtos);
});