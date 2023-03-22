import express from 'express';
import dotenv from 'dotenv';
import knex from 'knex';
import { startDatabaseConnection, stopDatabaseConnection } from "./database.js";
let connection;
const app = express();
const port = 8080;
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/status', (req, res) => {
    res.status(200).send();
});
app.post('/shorten', (req, res) => {
    let reqUrl = req.body.url;
    if (reqUrl === undefined) {
        res.status(400).send("400: url undefined");
    }
    else {
        const randomIndex = Math.floor(10000 + Math.random() * 90001);
        connection.query(`INSERT IGNORE INTO urls (url, urlIndex)
                          VALUES (?, ?)`, [reqUrl, randomIndex]);
        connection.query(`SELECT urlIndex as url
                          FROM urls
                          WHERE url = ?`, [reqUrl], function (err, result, fields) {
            if (err)
                res.status(500).send("500: internal server error");
            else
                res.status(200).send(JSON.parse(JSON.stringify(result)));
        });
    }
});
app.get('/unshorten/:id', (req, res) => {
    let urlIndex = Number(req.params.id);
    if (urlIndex === undefined) {
        res.status(400).send("400: index undefined");
    }
    else {
        connection.query(`SELECT url as url
                          FROM urls
                          WHERE urlindex = ?`, [urlIndex], function (err, result, fields) {
            if (err)
                res.status(500).send("500: internal server error");
            else if (result.length === 0)
                res.status(404).send("404: index not found");
            else
                res.status(200).send(JSON.parse(JSON.stringify(result)));
        });
    }
});
let server;
export async function startServer() {
    connection = startDatabaseConnection();
    const knexClient = knex({
        client: 'mysql2',
        connection: {
            database: "url_db",
            user: "root",
            password: "lorenza"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "migrations"
        }
    });
    await knexClient.migrate.latest();
    server = app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}
export async function stopServer() {
    await stopDatabaseConnection();
    server.close();
}
export default app;
//# sourceMappingURL=index.js.map