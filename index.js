const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = 3000;
const URL_TO_OPEN = "https://example.com"; // Замените на нужный URL

const TELEGRAM_BOT_TOKEN = "7979276569:AAGbVNeNsj4xR_kAd1f_cQUcMId3Wn-SWpE";
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

app.get("/start", async (req, res) => {
    const chatId = req.query.chat_id;
    if (!chatId) {
        return res.status(400).send("Chat ID is required");
    }

    const open = (await import("open")).default; // Динамический импорт
    await open(URL_TO_OPEN, { wait: false });

    bot.sendMessage(chatId, `Открыта вкладка: ${URL_TO_OPEN}`);
    res.send("Вкладка открыта и сообщение отправлено в Telegram!");
});

app.listen(PORT, async () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    const open = (await import("open")).default;
    open(`http://localhost:${PORT}/start?chat_id=YOUR_CHAT_ID`, { wait: false });
});
