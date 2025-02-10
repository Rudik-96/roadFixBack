const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const TOKEN = process.env.BOT_TOKEN;
const API_URL = `https://api.telegram.org/bot${TOKEN}`;

app.use(express.json());

app.post(`/webhook/${TOKEN}`, async (req, res) => {
    const update = req.body;

    if (update.message && update.message.text === "/start") {
        const chatId = update.message.chat.id;

        const replyMarkup = {
            inline_keyboard: [[
                { text: "🎥 Открыть YouTube", web_app: { url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" } }
            ]]
        };

        await fetch(`${API_URL}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: "Нажми на кнопку ниже, чтобы открыть видео 🎬",
                reply_markup: replyMarkup
            })
        });
    }

    res.sendStatus(200);
});

// Запуск сервера
app.listen(PORT, async () => {
    console.log(`✅ Бот запущен на порту ${PORT}`);

    // Устанавливаем вебхук для Telegram
    await fetch(`${API_URL}/setWebhook?url=${process.env.SERVER_URL}/webhook/${TOKEN}`);
});
