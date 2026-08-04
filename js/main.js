const themeToggle = document.getElementById("themeToggle");
const themeText = document.getElementById("themeText");

const DARK_THEME_CLASS = "darkTheme";
const THEME_STORAGE_KEY = "clicSellTheme";

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

applyTheme(getInitialTheme());

/* ===========================
   CATÁLOGO DE PRODUTOS
=========================== */

function renderizarProdutos() {
  const listaProdutos = document.getElementById("listaProdutos");
  const textoCatalogo = document.querySelector("#catalogo .sectionHeader p");

  textoCatalogo.textContent = `${produtos.length} produtos disponíveis.`;

  listaProdutos.classList.remove("catalogPlaceholder");
  listaProdutos.innerHTML = "";

  produtos.forEach((produto) => {
    const card = document.createElement("article");

    card.className = "produtoCard";

    card.innerHTML = `
      <img
        src="${produto.imagem}"
        alt="${produto.nome}"
      />

      <div class="produtoConteudo">

        <span class="produtoCategoria">
          ${produto.categoria}
        </span>

        <h3>${produto.nome}</h3>

        <p class="produtoPreco">
          ${produto.preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })}
        </p>

        <button
          class="button buttonPurple"
          type="button"
          data-produto-id="${produto.id}"
        >
          Comprar
        </button>

      </div>
    `;

    listaProdutos.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarProdutos();
});