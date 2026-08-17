const Entidade = require("./Entidade");

class Pedido extends Entidade {
    constructor({ id, cliente, itens, endereco }) {
        super(id);

        this.cliente = cliente;
        this.itens = itens;
        this.endereco = endereco;
        this.total = this.calcularTotal();

        this.validar();
    }

    validar() {
        if (!this.cliente?.trim()) {
            throw new Error("O nome do cliente é obrigatório.");
        }

        if (!Array.isArray(this.itens) || !this.itens.length) {
            throw new Error("O pedido deve possuir pelo menos um produto.");
        }

        this.itens.forEach((item) => {
            if (!item.nome?.trim()) {
                throw new Error("O nome do produto é obrigatório.");
            }

            if (!Number.isFinite(Number(item.preco)) || Number(item.preco) <= 0) {
                throw new Error("O preço do produto deve ser maior que zero.");
            }

            if (!Number.isInteger(Number(item.quantidade)) || Number(item.quantidade) <= 0) {
                throw new Error("A quantidade deve ser um número inteiro maior que zero.");
            }
        });

        return true;
    }

    calcularTotal() {
        if (!Array.isArray(this.itens)) {
            return 0;
        }

        return this.itens.reduce(
            (total, item) =>
                total + Number(item.preco) * Number(item.quantidade),
            0
        );
    }

    obterResumo() {
        return `Pedido ${this.id} - ${this.cliente} | ${this.itens.length} item(ns) | Total: R$ ${this.total.toFixed(2)}`;
    }
}

module.exports = Pedido;