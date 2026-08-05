const CART_STORAGE_KEY = "clicSellCart";

let carrinho = carregarCarrinho();

function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem(CART_STORAGE_KEY);

    if (!carrinhoSalvo) {
        return [];
    }

    try {
        const dados = JSON.parse(carrinhoSalvo);

        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        console.error("Erro ao carregar o carrinho:", erro);

        return [];
    }
}

function salvarCarrinho() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carrinho));
}

function adicionarAoCarrinho(produto) {
    const itemExistente = carrinho.find((item) => item.id === produto.id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function aumentarQuantidade(produtoId) {
    const item = carrinho.find((produto) => produto.id === produtoId);

    if (!item) {
        return;
    }

    item.quantidade += 1;

    salvarCarrinho();
    atualizarCarrinho();
}

function diminuirQuantidade(produtoId) {
    const item = carrinho.find((produto) => produto.id === produtoId);

    if (!item) {
        return;
    }

    if (item.quantidade > 1) {
        item.quantidade -= 1;
    } else {
        removerDoCarrinho(produtoId);
        return;
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter((produto) => produto.id !== produtoId);

    salvarCarrinho();
    atualizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];

    salvarCarrinho();
    atualizarCarrinho();
}

function calcularQuantidadeCarrinho() {
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
}

function calcularTotalCarrinho() {
    return carrinho.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
    );
}

function criarItemCarrinho(item) {
    const subtotal = item.preco * item.quantidade;

    return `
    <article class="cartItem">
      <div class="cartItemImage">
        <img src="${item.imagem}" alt="${item.nome}" />
      </div>

      <div class="cartItemContent">
        <h3>${item.nome}</h3>

        <p>${formatarPreco(item.preco)}</p>

        <div class="cartItemActions">
          <div class="quantityControl">
            <button
              class="quantityButton"
              type="button"
              data-action="decrease"
              data-product-id="${item.id}"
              aria-label="Diminuir quantidade de ${item.nome}"
            >
              −
            </button>

            <span>${item.quantidade}</span>

            <button
              class="quantityButton"
              type="button"
              data-action="increase"
              data-product-id="${item.id}"
              aria-label="Aumentar quantidade de ${item.nome}"
            >
              +
            </button>
          </div>

          <button
            class="removeCartItem"
            type="button"
            data-action="remove"
            data-product-id="${item.id}"
          >
            Remover
          </button>
        </div>

        <strong>${formatarPreco(subtotal)}</strong>
      </div>
    </article>
  `;
}

function renderizarCarrinho() {
    const listaCarrinho = document.getElementById("cartItems");
    const totalCarrinho = document.getElementById("cartTotal");
    const carrinhoVazio = document.getElementById("cartEmpty");

    listaCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        carrinhoVazio.hidden = false;
        totalCarrinho.textContent = formatarPreco(0);
        return;
    }

    carrinhoVazio.hidden = true;

    listaCarrinho.innerHTML = carrinho.map(criarItemCarrinho).join("");

    totalCarrinho.textContent = formatarPreco(calcularTotalCarrinho());
}

function atualizarContadorCarrinho() {
    const contadorCarrinho = document.getElementById("cartCount");

    contadorCarrinho.textContent = calcularQuantidadeCarrinho();
}

function atualizarCarrinho() {
    atualizarContadorCarrinho();
    renderizarCarrinho();
}

function tratarAcoesCarrinho(event) {
    const botao = event.target.closest("[data-action]");

    if (!botao) {
        return;
    }

    const produtoId = Number(botao.dataset.productId);
    const acao = botao.dataset.action;

    switch (acao) {
        case "increase":
            aumentarQuantidade(produtoId);
            break;

        case "decrease":
            diminuirQuantidade(produtoId);
            break;

        case "remove":
            removerDoCarrinho(produtoId);
            break;
    }
}