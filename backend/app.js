const readline = require("readline/promises");
const { stdin: input, stdout: output } = require("process");

const {
    listarProdutos,
    cadastrarProduto,
    calcularMediaPrecos
} = require("./services/produtoService");

const terminal = readline.createInterface({ input, output });

function exibirCabecalho() {
    console.log("\n================================");
    console.log("       ClicSell - Back-end");
    console.log("================================");
}

function exibirMenu() {
    console.log("\n1 - Cadastrar produto");
    console.log("2 - Listar produtos");
    console.log("3 - Calcular média de preços");
    console.log("0 - Sair");
}

async function cadastrarProdutoTerminal() {
    console.log("\n--- Cadastro de Produto ---");

    const nome = await terminal.question("Nome: ");
    const categoria = await terminal.question("Categoria: ");
    const precoInformado = await terminal.question("Preço: ");
    const imagem = await terminal.question("Caminho da imagem (opcional): ");

    const preco = Number(precoInformado.replace(",", "."));

    const produto = await cadastrarProduto({
        nome,
        categoria,
        preco,
        imagem
    });

    console.log("\nProduto cadastrado com sucesso!");
    console.log(produto.obterResumo());
}

async function exibirProdutos() {
    const produtos = await listarProdutos();

    console.log("\n--- Produtos Cadastrados ---");

    if (!produtos.length) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    produtos.forEach((produto) => {
        console.log(
            `${produto.id} - ${produto.nome} | ${produto.categoria} | R$ ${Number(produto.preco).toFixed(2)}`
        );
    });
}

async function exibirMediaPrecos() {
    const media = await calcularMediaPrecos();

    console.log("\n--- Média de Preços ---");

    if (media === 0) {
        console.log("Nenhum produto cadastrado.");
        return;
    }

    console.log(`R$ ${media.toFixed(2)}`);
}

async function iniciar() {
    let executando = true;

    exibirCabecalho();

    while (executando) {
        exibirMenu();

        const opcao = await terminal.question("\nEscolha uma opção: ");

        try {
            switch (opcao.trim()) {
                case "1":
                    await cadastrarProdutoTerminal();
                    break;

                case "2":
                    await exibirProdutos();
                    break;

                case "3":
                    await exibirMediaPrecos();
                    break;

                case "0":
                    executando = false;
                    console.log("\nEncerrando ClicSell...");
                    break;

                default:
                    console.log("\nOpção inválida.");
            }
        } catch (erro) {
            console.error(`\nErro: ${erro.message}`);
        }
    }

    terminal.close();
}

iniciar();