const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use("/css", express.static(path.join(__dirname, "../css")));
app.use("/data", express.static(path.join(__dirname, "../data")));
app.use("/img", express.static(path.join(__dirname, "../img")));
app.use("/js", express.static(path.join(__dirname, "../js")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/api", (req, res) => {
    res.status(200).json({
        nome: "ClicSell API",
        versao: "1.0.0",
        status: "online"
    });
});

app.use((req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada."
    });
});

module.exports = app;