const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "pharma_db",
    port: 3306
});

conn.connect();

module.exports = conn;