const path = require("path");
const Pedido = require("../models/Pedido");
const { lerJson, salvarJson } = require("../utils/arquivo");

const caminhoPedidos = path.join(__dirname, "../../data/pedidos.json");

async function listarPedidos() {
    return await lerJson(caminhoPedidos);
}

async function criarPedido(dados) {
    const pedidos = await listarPedidos();

    const novoId = pedidos.length
        ? Math.max(...pedidos.map((pedido) => pedido.id)) + 1
        : 1;

    const pedido = new Pedido({
        id: novoId,
        ...dados
    });

    pedidos.push(pedido);
    await salvarJson(caminhoPedidos, pedidos);

    return pedido;
}

module.exports = {
    listarPedidos,
    criarPedido
};