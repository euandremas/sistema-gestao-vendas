const Entidade = require("./Entidade");

class Produto extends Entidade {
    constructor({ id, nome, categoria, preco, imagem = "" }) {
        super(id);

        this.nome = nome;
        this.categoria = categoria;
        this.preco = Number(preco);
        this.imagem = imagem;

        this.validar();
    }

    validar() {
        if (!this.nome?.trim()) {
            throw new Error("O nome do produto é obrigatório.");
        }

        if (!this.categoria?.trim()) {
            throw new Error("A categoria do produto é obrigatória.");
        }

        if (!Number.isFinite(this.preco) || this.preco <= 0) {
            throw new Error("O preço deve ser maior que zero.");
        }

        return true;
    }

    obterResumo() {
        return `${this.id} - ${this.nome} | ${this.categoria} | R$ ${this.preco.toFixed(2)}`;
    }
}

module.exports = Produto;