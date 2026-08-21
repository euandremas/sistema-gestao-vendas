const path = require("path");
const Produto = require("../models/Produto");
const { lerJson, salvarJson } = require("../utils/arquivo");

const caminhoProdutos = path.join(__dirname, "../../data/produtos.json");

async function listarProdutos() {
    return await lerJson(caminhoProdutos);
}

async function buscarProdutoPorId(id) {
    const produtos = await listarProdutos();

    return produtos.find((produto) => produto.id === Number(id));
}

async function cadastrarProduto(dados) {
    const produtos = await listarProdutos();

    const novoId = produtos.length
        ? Math.max(...produtos.map((produto) => produto.id)) + 1
        : 1;

    const produto = new Produto({
        id: novoId,
        ...dados
    });

    produtos.push(produto);

    await salvarJson(caminhoProdutos, produtos);

    return produto;
}

async function atualizarProduto(id, dados) {
    const produtos = await listarProdutos();

    const indice = produtos.findIndex(
        (produto) => produto.id === Number(id)
    );

    if (indice === -1) {
        return null;
    }

    const produtoAtualizado = new Produto({
        ...produtos[indice],
        ...dados,
        id: Number(id)
    });

    produtos[indice] = produtoAtualizado;

    await salvarJson(caminhoProdutos, produtos);

    return produtoAtualizado;
}

async function excluirProduto(id) {
    const produtos = await listarProdutos();

    const indice = produtos.findIndex(
        (produto) => produto.id === Number(id)
    );

    if (indice === -1) {
        return null;
    }

    const [produtoExcluido] = produtos.splice(indice, 1);

    await salvarJson(caminhoProdutos, produtos);

    return produtoExcluido;
}

async function calcularMediaPrecos() {
    const produtos = await listarProdutos();

    if (!produtos.length) {
        return 0;
    }

    const total = produtos.reduce(
        (soma, produto) => soma + Number(produto.preco),
        0
    );

    return total / produtos.length;
}

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto,
    calcularMediaPrecos
};