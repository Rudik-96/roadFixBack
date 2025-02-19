const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const TOKEN = process.env.BOT_TOKEN;
const API_URL = `https://api.telegram.org/bot${TOKEN}`;

app.use(express.json());

// Логирование входящих запросов
app.use((req, res, next) => {
    console.log(`📥 Запрос: ${req.method} ${req.url}`);
    next();
});

// 📌 Вебхук теперь работает по `/webhook` (без токена)
app.post("/webhook", async (req, res) => {
    console.log("📩 Получен апдейт от Telegram:", JSON.stringify(req.body, null, 2));

    const update = req.body;
    if (update.message && update.message.text === "/start") {
        const chatId = update.message.chat.id;

        const replyMarkup = {
            inline_keyboard: [[
                { text: "🎥 Открыть YouTube", web_app: { url: "https://roadfix-c0996.web.app/" } }
            ]]
        };

        try {
            const response = await fetch(`${API_URL}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: "Нажми на кнопку ниже, чтобы открыть видео 🎬",
                    reply_markup: replyMarkup
                })
            });

            const data = await response.json();
            console.log("📤 Ответ Telegram API:", data);

        } catch (error) {
            console.error("❌ Ошибка при отправке сообщения:", error);
        }
    }

    res.sendStatus(200);
});
// postgresql://postgres:roadFix2025@postgres.railway.internal:5432/railway
// postgresql://postgres:roadFix2025@postgres.railway.internal:5432/railway
// postgresql://postgres:roadFix2025@postgres.railway.internal:5432/railway
