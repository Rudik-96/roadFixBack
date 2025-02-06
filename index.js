const express = require("express");
const open = require("open");

const app = express();
const PORT = 3000;
const URL_TO_OPEN = "https://example.com"; // Замените на нужный URL

app.get("/start", (req, res) => {
    open(URL_TO_OPEN);
    res.send("Вкладка открыта!");
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    open(`http://localhost:${PORT}/start`); // Автоматически открывает вкладку при запуске
});