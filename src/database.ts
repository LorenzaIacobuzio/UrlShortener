const mysql = require('mysql')

export function startDatabaseConnection() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'lorenza',
        database: 'url_shortener_db',
        port: 49155
    })

    connection.connect((err: any) => {
        if (err) throw err
    });

    return connection
}