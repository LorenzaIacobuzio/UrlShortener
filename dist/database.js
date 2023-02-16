"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDatabaseConnection = void 0;
const mysql = require('mysql');
function startDatabaseConnection() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'lorenza',
        database: 'url_shortener_db',
        port: 49155,
    });
    connection.connect((err) => {
        if (err)
            throw err;
    });
    return connection;
}
exports.startDatabaseConnection = startDatabaseConnection;
//# sourceMappingURL=database.js.map