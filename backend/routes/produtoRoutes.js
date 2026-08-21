const express = require("express");

const {
    listar,
    buscarPorId,
    cadastrar,
    atualizar,
    excluir
} = require("../controllers/produtoController");

const router = express.Router();

router.get("/", listar);
router.get("/:id", buscarPorId);
router.post("/", cadastrar);
router.put("/:id", atualizar);
router.delete("/:id", excluir);

module.exports = router;