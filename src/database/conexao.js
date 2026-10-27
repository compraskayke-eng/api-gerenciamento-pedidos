
const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');

const caminhoBanco = path.join(__dirname, 'pedidos.db');

const db = new DatabaseSync(caminhoBanco);

db.exec(`
    CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente TEXT NOT NULL,
        tipo TEXT NOT NULL,
        valor REAL NOT NULL CHECK (valor > 0),
        prioridade TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'recebido'
    )
`);

module.exports = db;
