const express = require("express");
import open from "open";
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = 3000;
const URL_TO_OPEN = "https://example.com"; // Замените на нужный URL

// Замените на ваш токен Telegram-бота
const TELEGRAM_BOT_TOKEN = "7979276569:AAGbVNeNsj4xR_kAd1f_cQUcMId3Wn-SWpE";
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

app.get("/", (req, res) => {
    res.send("Сервер работает! Используйте /start?chat_id=YOUR_CHAT_ID");
});

app.get("/start", async (req, res) => {
    const chatId = req.query.chat_id;
    if (!chatId) {
        return res.status(400).send("Chat ID is required");
    }

    await open(URL_TO_OPEN, { wait: false }); // Открытие без ожидания (чтобы не блокировало)
    bot.sendMessage(chatId, `Открыта вкладка: ${URL_TO_OPEN}`);
    res.send("Вкладка открыта и сообщение отправлено в Telegram!");
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    open(`http://localhost:${PORT}/start?chat_id=YOUR_CHAT_ID`, { wait: false }); // Авто-открытие при запуске
});
