const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const TOKEN = process.env.BOT_TOKEN;
const API_URL = `https://api.telegram.org/bot${TOKEN}`;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`📥 Запрос: ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("✅ Бот работает!");
});

// 📌 Обработка вебхука Telegram
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
            if (!data.ok) {
                console.error("❌ Ошибка Telegram API:", data);
            } else {
                console.log("📤 Сообщение отправлено:", data);
            }
        } catch (error) {
            console.error("❌ Ошибка при отправке сообщения:", error);
        }
    }

    res.sendStatus(200);
});

// ✅ Запуск сервера
app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Бот запущен на порту ${PORT}`);
});

// 🔥 Обработчик ошибок сервера
process.on("SIGTERM", () => {
    console.log("⚠️ Получен SIGTERM, сервер завершается...");
    process.exit(0);
});

process.on("SIGINT", () => {
    console.log("⚠️ Получен SIGINT, сервер завершается...");
    process.exit(0);
});

process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});
