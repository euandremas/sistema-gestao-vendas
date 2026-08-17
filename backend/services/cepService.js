async function buscarCep(cep) {
    const cepLimpo = String(cep).replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
        throw new Error("O CEP deve possuir 8 dígitos.");
    }

    const resposta = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
    );

    if (!resposta.ok) {
        throw new Error("Não foi possível consultar o CEP.");
    }

    const dados = await resposta.json();

    if (dados.erro) {
        throw new Error("CEP não encontrado.");
    }

    return {
        cep: dados.cep,
        logradouro: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        uf: dados.uf
    };
}

module.exports = { buscarCep };