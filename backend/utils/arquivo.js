const fs = require("fs/promises");

async function lerJson(caminho) {
    try {
        const conteudo = await fs.readFile(caminho, "utf-8");
        return JSON.parse(conteudo);
    } catch (erro) {
        throw new Error(`Erro ao ler o arquivo: ${erro.message}`);
    }
}

async function salvarJson(caminho, dados) {
    try {
        const conteudo = JSON.stringify(dados, null, 2);
        await fs.writeFile(caminho, conteudo, "utf-8");
    } catch (erro) {
        throw new Error(`Erro ao salvar o arquivo: ${erro.message}`);
    }
}

module.exports = { lerJson, salvarJson };