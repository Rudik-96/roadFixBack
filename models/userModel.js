const pool = require("../config/db");

async function getUsers() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}

async function addUser(telegramId, name, role) {
    const { rows } = await pool.query(
        "INSERT INTO users (telegram_id, name, role) VALUES ($1, $2, $3) RETURNING *",
        [telegramId, name, role]
    );
    return rows[0];
}

module.exports = { getUsers, addUser };
