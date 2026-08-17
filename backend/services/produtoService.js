const path = require("path");
const Produto = require("../models/Produto");
const { lerJson, salvarJson } = require("../utils/arquivo");

const caminhoProdutos = path.join(__dirname, "../../data/produtos.json");

async function listarProdutos() {
    return await lerJson(caminhoProdutos);
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
    cadastrarProduto,
    calcularMediaPrecos
};