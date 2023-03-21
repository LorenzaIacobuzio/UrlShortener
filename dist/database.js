"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopDatabaseConnection = exports.startDatabaseConnection = void 0;
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lorenza',
    database: 'url_db',
    port: 3306,
});
function startDatabaseConnection() {
    connection.connect((err) => {
        if (err)
            throw err;
    });
    return connection;
}
exports.startDatabaseConnection = startDatabaseConnection;
function stopDatabaseConnection() {
    connection.end();
}
exports.stopDatabaseConnection = stopDatabaseConnection;
//# sourceMappingURL=database.js.map