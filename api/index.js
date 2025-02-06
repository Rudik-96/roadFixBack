const TELEGRAM_BOT_TOKEN = "7979276569:AAGbVNeNsj4xR_kAd1f_cQUcMId3Wn-SWpE";

import TelegramBot from 'node-telegram-bot-api';

// Замените на токен вашего Telegram-бота
const token = 'TELEGRAM_BOT_TOKEN';

// Создаем экземпляр бота с polling-режимом
const bot = new TelegramBot(token, { polling: true });

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  // Определяем клавиатуру с кнопкой, которая открывает URL
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть URL',
            url: 'https://example.com' // Замените на нужный URL
          }
        ]
      ]
    }
  };
  
  // Отправляем сообщение с кнопкой
  bot.sendMessage(chatId, 'Нажмите кнопку, чтобы открыть страницу:', opts);
});

// Дополнительная обработка входящих сообщений (опционально)
bot.on('message', (msg) => {
  console.log(`Получено сообщение от ${msg.chat.username || msg.chat.id}: ${msg.text}`);
});

// import express from 'express';
// import open from 'open';
// import TelegramBot from 'node-telegram-bot-api';

// const app = express();
// const PORT = 3000;
// const URL_TO_OPEN = "https://example.com"; 
// const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// app.get("/", (req, res) => {
//   res.send("Server is running! Use /start?chat_id=YOUR_CHAT_ID");
// });

// app.get("/start", async (req, res) => {
//   const chatId = req.query.chat_id;
//   if (!chatId) {
//     return res.status(400).send("Chat ID is required");
//   }

//   await open(URL_TO_OPEN, { wait: false });
  
//   bot.sendMessage(chatId, `Opened tab: ${URL_TO_OPEN}`);
  
//   res.send("Tab opened and message sent to Telegram!");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
  
//   open(`http://localhost:${PORT}/start?chat_id=YOUR_CHAT_ID`, { wait: false });
// });
