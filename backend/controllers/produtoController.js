const {
    listarProdutos,
    buscarProdutoPorId,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
} = require("../services/produtoService");

async function listar(req, res) {
    try {
        const produtos = await listarProdutos();

        res.status(200).json(produtos);
    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
}

async function buscarPorId(req, res) {
    try {
        const produto = await buscarProdutoPorId(req.params.id);

        if (!produto) {
            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        res.status(200).json(produto);
    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
}

async function cadastrar(req, res) {
    try {
        const produto = await cadastrarProduto(req.body);

        res.status(201).json({
            mensagem: "Produto cadastrado com sucesso.",
            produto
        });
    } catch (erro) {
        res.status(400).json({
            erro: erro.message
        });
    }
}

async function atualizar(req, res) {
    try {
        const produto = await atualizarProduto(
            req.params.id,
            req.body
        );

        if (!produto) {
            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        res.status(200).json({
            mensagem: "Produto atualizado com sucesso.",
            produto
        });
    } catch (erro) {
        res.status(400).json({
            erro: erro.message
        });
    }
}

async function excluir(req, res) {
    try {
        const produto = await excluirProduto(req.params.id);

        if (!produto) {
            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        res.status(200).json({
            mensagem: "Produto excluído com sucesso.",
            produto
        });
    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
}

module.exports = {
    listar,
    buscarPorId,
    cadastrar,
    atualizar,
    excluir
};