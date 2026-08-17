const {
    listarProdutos,
    cadastrarProduto,
    calcularMediaPrecos
} = require("./services/produtoService");

async function iniciar() {
    try {
        let produtos = await listarProdutos();

        if (!produtos.length) {
            await cadastrarProduto({
                nome: "Notebook Dell Inspiron",
                categoria: "Informática",
                preco: 4299.9,
                imagem: "./img/produtos/notebook.jpg"
            });

            produtos = await listarProdutos();
        }

        const media = await calcularMediaPrecos();

        console.log("================================");
        console.log("       ClicSell - Back-end");
        console.log("================================");
        console.log(`Produtos cadastrados: ${produtos.length}`);
        console.log(`Média de preços: R$ ${media.toFixed(2)}`);
    } catch (erro) {
        console.error(erro.message);
    }
}

iniciar();