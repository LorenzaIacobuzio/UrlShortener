"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopServer = exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./database");
const http_terminator_1 = require("http-terminator");
let connection;
const app = (0, express_1.default)();
const port = 8080;
dotenv_1.default.config();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
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
        connection.query(`CREATE TABLE IF NOT EXISTS url_table
                          (
                              input_url    VARCHAR(512) UNIQUE,
                              output_index INT(10) UNIQUE
                          )`);
        connection.query(`INSERT IGNORE INTO url_table (input_url, output_index)
                          VALUES (?, ?)`, [reqUrl, randomIndex]);
        connection.query(`SELECT output_index as url
                          FROM url_table
                          WHERE input_url = ?`, [reqUrl], function (err, result, fields) {
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
        connection.query(`SELECT input_url as url
                          FROM url_table
                          WHERE output_index = ?`, [urlIndex], function (err, result, fields) {
            if (err)
                res.status(500).send("500: internal server error");
            else if (result.length === 0)
                res.status(404).send("404: index not found");
            else
                res.status(200).send(JSON.parse(JSON.stringify(result)));
        });
    }
});
let httpTerminator;
function startServer() {
    connection = (0, database_1.startDatabaseConnection)();
    let server = app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
    httpTerminator = (0, http_terminator_1.createHttpTerminator)({ server });
}
exports.startServer = startServer;
async function stopServer() {
    (0, database_1.stopDatabaseConnection)();
    await httpTerminator.terminate();
}
exports.stopServer = stopServer;
exports.default = app;
//# sourceMappingURL=index.js.map