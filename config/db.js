const { Pool } = require("pg");
require("dotenv").config();

console.log("🔌 Подключение к PostgreSQL...");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("railway") ? { rejectUnauthorized: false } : false,
});

pool.connect()
    .then(() => console.log("✅ PostgreSQL connected"))
    .catch(err => {
        console.error("❌ Ошибка подключения к PostgreSQL:", err);
        process.exit(1); // Безопасное завершение, если база не подключается
    });

module.exports = pool;
