const formDesconto = document.getElementById("formDesconto");
const precoProdutoInput = document.getElementById("precoProduto");
const percentualDescontoInput = document.getElementById("percentualDesconto");
const resultadoDesconto = document.getElementById("resultadoDesconto");

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function exibirErroDesconto(mensagem) {
  resultadoDesconto.classList.remove("resultSuccess");
  resultadoDesconto.classList.add("resultError");

  resultadoDesconto.innerHTML = `
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

function exibirResultadoDesconto(preco, percentual, valorDesconto, precoFinal) {
  resultadoDesconto.classList.remove("resultError");
  resultadoDesconto.classList.add("resultSuccess");

  resultadoDesconto.innerHTML = `
    <div class="descontoResultado">
      <div>
        <span>Preço original</span>
        <strong>${formatarMoeda(preco)}</strong>
      </div>

      <div>
        <span>Desconto aplicado</span>
        <strong>${percentual}%</strong>
      </div>

      <div>
        <span>Você economiza</span>
        <strong>${formatarMoeda(valorDesconto)}</strong>
      </div>

      <div>
        <span>Preço final</span>
        <strong>${formatarMoeda(precoFinal)}</strong>
      </div>
    </div>
  `;
}

const calcularDesconto = (event) => {
  event.preventDefault();

  const preco = Number(precoProdutoInput.value);
  const percentual = Number(percentualDescontoInput.value);

  if (!Number.isFinite(preco) || preco <= 0) {
    exibirErroDesconto("Informe um preço válido maior que zero.");
    return;
  }

  if (!Number.isFinite(percentual) || percentual <= 0 || percentual >= 100) {
    exibirErroDesconto("Informe um desconto entre 1% e 99%.");
    return;
  }

  const valorDesconto = preco * (percentual / 100);
  const precoFinal = preco - valorDesconto;

  exibirResultadoDesconto(
    preco,
    percentual,
    valorDesconto,
    precoFinal
  );
}

formDesconto.addEventListener("submit", calcularDesconto);