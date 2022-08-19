const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "pharma_db",
});

conn.connect();

module.exports = conn;