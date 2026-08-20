const app = require("./app");

const porta = process.env.PORT || 3000;

app.listen(porta, () => {
    console.log(`ClicSell disponível em http://localhost:${porta}`);
    console.log(`API disponível em http://localhost:${porta}/api`);
});