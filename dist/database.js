import mysql from 'mysql2';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lorenza',
    database: 'url_db',
    port: 3306,
});
export function startDatabaseConnection() {
    connection.connect((err) => {
        if (err)
            throw err;
    });
    return connection;
}
export async function stopDatabaseConnection() {
    await connection.end();
}
//# sourceMappingURL=database.js.map