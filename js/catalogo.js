let produtos = [];

async function carregarProdutos() {
    try {
        const resposta = await fetch("./data/produtos.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os produtos.");
        }

        produtos = await resposta.json();

        return produtos;
    } catch (erro) {
        console.error(`Erro ao carregar catálogo: ${erro.message}`);
        return [];
    }
}