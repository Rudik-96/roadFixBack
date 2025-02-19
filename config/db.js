const { Pool } = require("pg");
require("dotenv").config();

console.log("🔌 Подключение к PostgreSQL...");
console.log(`🔍 DATABASE_URL из .env: ${process.env.DATABASE_URL}`);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { require: true, rejectUnauthorized: false } // Включаем SSL
});

pool.connect()
    .then(() => console.log("✅ PostgreSQL connected"))
    .catch(err => console.error("❌ Ошибка подключения к PostgreSQL:", err));

module.exports = pool;
