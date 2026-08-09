const FAVORITES_STORAGE_KEY = "clicSellFavorites";

let favoritos = carregarFavoritos();

function carregarFavoritos() {
    const favoritosSalvos = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!favoritosSalvos) {
        return [];
    }

    try {
        const dados = JSON.parse(favoritosSalvos);

        return Array.isArray(dados) ? dados : [];
    } catch (erro) {
        console.error("Erro ao carregar favoritos:", erro);

        return [];
    }
}

function salvarFavoritos() {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoritos));
}

function produtoEstaFavoritado(produtoId) {
    return favoritos.includes(produtoId);
}

function alternarFavorito(produtoId) {
    if (produtoEstaFavoritado(produtoId)) {
        favoritos = favoritos.filter((id) => id !== produtoId);
    } else {
        favoritos.push(produtoId);
    }

    salvarFavoritos();
    atualizarContadorFavoritos();

    return produtoEstaFavoritado(produtoId);
}

function calcularQuantidadeFavoritos() {
    return favoritos.length;
}

function atualizarContadorFavoritos() {
    const contadorFavoritos = document.getElementById("favoritesCount");

    if (!contadorFavoritos) {
        return;
    }

    contadorFavoritos.textContent = calcularQuantidadeFavoritos();
}