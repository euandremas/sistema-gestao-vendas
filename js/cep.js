const formCep = document.getElementById("formCep");
const cepBuscaInput = document.getElementById("cepBusca");
const resultadoCep = document.getElementById("resultadoCep");
const botaoBuscarCep = formCep.querySelector('button[type="submit"]');

function limparCep(cep) {
    return cep.replace(/\D/g, "");
}

function formatarCep(cep) {
    const cepLimpo = limparCep(cep);

    return cepLimpo.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

function exibirCarregamentoCep() {
    resultadoCep.classList.remove("resultSuccess", "resultError");
    resultadoCep.classList.add("resultLoading");

    resultadoCep.innerHTML = `
    <span class="loadingSpinner" aria-hidden="true"></span>
    <p>Buscando endereço...</p>
  `;

    botaoBuscarCep.disabled = true;
    botaoBuscarCep.textContent = "Buscando...";
}

function restaurarBotaoCep() {
    botaoBuscarCep.disabled = false;

    botaoBuscarCep.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6"></circle>
      <path d="m16 16 4 4"></path>
    </svg>

    Buscar CEP
  `;
}

function exibirErroCep(mensagem) {
    resultadoCep.classList.remove("resultSuccess", "resultLoading");
    resultadoCep.classList.add("resultError");

    resultadoCep.innerHTML = `
    <span class="resultIcon" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M12 8v5"></path>
        <path d="M12 16h.01"></path>
      </svg>
    </span>

    <p>${mensagem}</p>
  `;
}

function exibirEndereco(endereco) {
    const complemento = endereco.complemento
        ? `<span>${endereco.complemento}</span>`
        : "";

    resultadoCep.classList.remove("resultError", "resultLoading");
    resultadoCep.classList.add("resultSuccess");

    resultadoCep.innerHTML = `
    <div class="enderecoResultado">
      <div class="enderecoIcon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z"></path>
          <circle cx="12" cy="10" r="2"></circle>
        </svg>
      </div>

      <div class="enderecoConteudo">
        <strong>Endereço encontrado</strong>

        <span>
          ${endereco.logradouro || "Logradouro não informado"}
        </span>

        ${complemento}

        <span>
          ${endereco.bairro || "Bairro não informado"}
        </span>

        <span>
          ${endereco.localidade} - ${endereco.uf}
        </span>

        <span>
          CEP ${endereco.cep}
        </span>
      </div>
    </div>
  `;
}

async function buscarCep(event) {
    event.preventDefault();

    const cep = limparCep(cepBuscaInput.value);

    if (cep.length !== 8) {
        exibirErroCep("Digite um CEP válido com 8 números.");
        cepBuscaInput.focus();
        return;
    }

    exibirCarregamentoCep();

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (!resposta.ok) {
            throw new Error("Não foi possível consultar o CEP.");
        }

        const endereco = await resposta.json();

        if (endereco.erro) {
            exibirErroCep("CEP não encontrado. Confira os números informados.");
            return;
        }

        cepBuscaInput.value = formatarCep(cep);

        exibirEndereco(endereco);
    } catch (erro) {
        console.error("Erro ao consultar o CEP:", erro);

        exibirErroCep(
            "Não foi possível consultar o CEP agora. Verifique sua conexão e tente novamente."
        );
    } finally {
        restaurarBotaoCep();
    }
}

function aplicarMascaraCep(event) {
    let cep = limparCep(event.target.value);

    cep = cep.slice(0, 8);

    if (cep.length > 5) {
        cep = `${cep.slice(0, 5)}-${cep.slice(5)}`;
    }

    event.target.value = cep;
}

cepBuscaInput.addEventListener("input", aplicarMascaraCep);
formCep.addEventListener("submit", buscarCep);