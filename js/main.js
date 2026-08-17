const themeToggle = document.getElementById("themeToggle");
const themeText = document.getElementById("themeText");
const themeIcon = document.getElementById("themeIcon");

const buscaProdutoInput = document.getElementById("buscaProduto");
const filtroCategoriaSelect = document.getElementById("filtroCategoria");
const ordenacaoProdutosSelect = document.getElementById("ordenacaoProdutos");

const listaProdutos = document.getElementById("listaProdutos");
const textoCatalogo = document.querySelector("#catalogo .sectionHeader p");

const openCartButton = document.getElementById("openCartButton");
const closeCartButton = document.getElementById("closeCartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const clearCartButton = document.getElementById("clearCartButton");
const checkoutButton = document.getElementById("checkoutButton");

const favoritesButton = document.getElementById("favoritesButton");

const DARK_THEME_CLASS = "darkTheme";
const THEME_STORAGE_KEY = "clicSellTheme";

let toastTimeout;
let mostrarSomenteFavoritos = false;

/* ===========================
   TEMA
=========================== */

function updateThemeIcon(isDarkTheme) {
  if (isDarkTheme) {
    themeIcon.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.42 1.42"></path>
        <path d="m17.65 17.65 1.42 1.42"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.35 17.65-1.42 1.42"></path>
        <path d="m19.07 4.93-1.42 1.42"></path>
      </svg>
    `;

    themeIcon.classList.add("themeIconSun");
    themeIcon.classList.remove("themeIconMoon");

    return;
  }

  themeIcon.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"></path>

      <path
        class="themeSparkle"
        d="m17.5 3 .5 1.5L19.5 5 18 5.5 17.5 7 17 5.5 15.5 5 17 4.5 17.5 3Z"
      ></path>
    </svg>
  `;

  themeIcon.classList.add("themeIconMoon");
  themeIcon.classList.remove("themeIconSun");
}

function updateThemeControls(isDarkTheme) {
  themeToggle.checked = isDarkTheme;
  themeText.textContent = isDarkTheme ? "Modo claro" : "Modo escuro";

  updateThemeIcon(isDarkTheme);
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

  const prefersDarkTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  return prefersDarkTheme ? "dark" : "light";
}

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

  if (!toast) {
    return;
  }

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

  imagemFallback.setAttribute(
    "aria-label",
    `Imagem indisponível para ${imagem.alt}`
  );

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
  const isFavorito = produtoEstaFavoritado(produto.id);

  card.className = "produtoCard";
  card.dataset.produtoId = produto.id;

  card.innerHTML = `
    <div class="produtoImagemWrapper">
      <button
        class="favoriteProductButton ${isFavorito ? "favoriteProductButtonActive" : ""
    }"
        type="button"
        data-favorite-product-id="${produto.id}"
        aria-label="${isFavorito
      ? `Remover ${produto.nome} dos favoritos`
      : `Adicionar ${produto.nome} aos favoritos`
    }"
        aria-pressed="${isFavorito}"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"
          ></path>
        </svg>
      </button>

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

function ordenarProdutos(lista) {
  const produtosOrdenados = [...lista];

  switch (ordenacaoProdutosSelect.value) {
    case "menorPreco":
      produtosOrdenados.sort(
        (produtoA, produtoB) => produtoA.preco - produtoB.preco
      );
      break;

    case "maiorPreco":
      produtosOrdenados.sort(
        (produtoA, produtoB) => produtoB.preco - produtoA.preco
      );
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
      produtosOrdenados.sort(
        (produtoA, produtoB) => produtoA.id - produtoB.id
      );
  }

  return produtosOrdenados;
}

function obterProdutosFiltrados() {
  const termoBusca = normalizarTexto(buscaProdutoInput.value);
  const categoriaSelecionada = filtroCategoriaSelect.value;

  const produtosFiltrados = produtos.filter((produto) => {
    const nomeProduto = normalizarTexto(produto.nome);
    const categoriaProduto = normalizarTexto(produto.categoria);

    const correspondeBusca =
      nomeProduto.includes(termoBusca) ||
      categoriaProduto.includes(termoBusca);

    const correspondeCategoria =
      categoriaSelecionada === "todos" ||
      produto.categoria === categoriaSelecionada;

    const correspondeFavorito =
      !mostrarSomenteFavoritos ||
      produtoEstaFavoritado(produto.id);

    return (
      correspondeBusca &&
      correspondeCategoria &&
      correspondeFavorito
    );
  });

  return ordenarProdutos(produtosFiltrados);
}

function atualizarCatalogo() {
  const produtosFiltrados = obterProdutosFiltrados();

  renderizarProdutos(produtosFiltrados);
}

function preencherCategorias() {
  const categorias = [
    ...new Set(produtos.map((produto) => produto.categoria))
  ];

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

/* ===========================
   FAVORITOS
=========================== */

function tratarFavoritoProduto(event) {
  const botaoFavorito = event.target.closest(
    "[data-favorite-product-id]"
  );

  if (!botaoFavorito) {
    return false;
  }

  const produtoId = Number(
    botaoFavorito.dataset.favoriteProductId
  );

  const produtoSelecionado = produtos.find(
    (produto) => produto.id === produtoId
  );

  if (!produtoSelecionado) {
    return true;
  }

  const foiFavoritado = alternarFavorito(produtoId);

  atualizarCatalogo();

  exibirToast(
    foiFavoritado
      ? `${produtoSelecionado.nome} foi adicionado aos favoritos.`
      : `${produtoSelecionado.nome} foi removido dos favoritos.`
  );

  return true;
}

function alternarFiltroFavoritos() {
  mostrarSomenteFavoritos = !mostrarSomenteFavoritos;

  favoritesButton.classList.toggle(
    "favoritesButtonActive",
    mostrarSomenteFavoritos
  );

  favoritesButton.setAttribute(
    "aria-pressed",
    String(mostrarSomenteFavoritos)
  );

  atualizarCatalogo();

  exibirToast(
    mostrarSomenteFavoritos
      ? "Exibindo somente produtos favoritos."
      : "Exibindo todos os produtos."
  );
}

/* ===========================
   CARRINHO
=========================== */

function abrirCarrinho() {
  cartDrawer.classList.add("cartDrawerOpen");
  cartOverlay.classList.add("cartOverlayVisible");

  cartDrawer.setAttribute("aria-hidden", "false");

  document.body.classList.add("cartOpen");
}

function fecharCarrinho() {
  cartDrawer.classList.remove("cartDrawerOpen");
  cartOverlay.classList.remove("cartOverlayVisible");

  cartDrawer.setAttribute("aria-hidden", "true");

  document.body.classList.remove("cartOpen");
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

  adicionarAoCarrinho(produtoSelecionado);

  exibirToast(
    `${produtoSelecionado.nome} foi adicionado ao carrinho.`
  );
}

/* ===========================
   EVENTOS DO TEMA
=========================== */

themeToggle.addEventListener("change", () => {
  const selectedTheme = themeToggle.checked
    ? "dark"
    : "light";

  localStorage.setItem(
    THEME_STORAGE_KEY,
    selectedTheme
  );

  applyTheme(selectedTheme);
});

/* ===========================
   EVENTOS DO CATÁLOGO
=========================== */

buscaProdutoInput.addEventListener(
  "input",
  atualizarCatalogo
);

filtroCategoriaSelect.addEventListener(
  "change",
  atualizarCatalogo
);

ordenacaoProdutosSelect.addEventListener(
  "change",
  atualizarCatalogo
);

listaProdutos.addEventListener("click", (event) => {
  const cliqueEmFavorito = tratarFavoritoProduto(event);

  if (cliqueEmFavorito) {
    return;
  }

  selecionarProduto(event);
});

/* ===========================
   EVENTOS DOS FAVORITOS
=========================== */

favoritesButton.addEventListener(
  "click",
  alternarFiltroFavoritos
);

/* ===========================
   EVENTOS DO CARRINHO
=========================== */

openCartButton.addEventListener(
  "click",
  abrirCarrinho
);

closeCartButton.addEventListener(
  "click",
  fecharCarrinho
);

cartOverlay.addEventListener(
  "click",
  fecharCarrinho
);

cartItems.addEventListener(
  "click",
  tratarAcoesCarrinho
);

clearCartButton.addEventListener("click", () => {
  if (carrinho.length === 0) {
    exibirToast("O carrinho já está vazio.");
    return;
  }

  limparCarrinho();

  exibirToast("Carrinho esvaziado.");
});

checkoutButton.addEventListener("click", () => {
  if (carrinho.length === 0) {
    exibirToast(
      "Adicione produtos antes de finalizar a compra."
    );

    return;
  }

  exibirToast(
    "Fluxo de checkout será implementado nas próximas etapas."
  );
});

/* ===========================
   EVENTOS GLOBAIS
=========================== */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    fecharCarrinho();
  }
});

/* ===========================
   INICIALIZAÇÃO
=========================== */

document.addEventListener("DOMContentLoaded", async () => {
  applyTheme(getInitialTheme());

  await carregarProdutos();

  preencherCategorias();

  renderizarProdutos(produtos);

  atualizarCarrinho();

  atualizarContadorFavoritos();
});