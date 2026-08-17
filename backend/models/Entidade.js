class Entidade {
    constructor(id) {
        this.id = id;
    }

    validar() {
        throw new Error("O método validar() deve ser implementado.");
    }

    obterResumo() {
        throw new Error("O método obterResumo() deve ser implementado.");
    }
}

module.exports = Entidade;