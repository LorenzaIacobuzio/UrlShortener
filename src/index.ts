import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import {startDatabaseConnection, stopDatabaseConnection} from "./database";
import {createHttpTerminator, HttpTerminator} from "http-terminator";

let connection: any
const app: Express = express()
const port = 8080

dotenv.config()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/status', (req: Request, res: Response) => {
    res.status(200).send()
})

app.post('/shorten', (req: Request, res: Response) => {
    let reqUrl = req.body.url
    if (reqUrl === undefined) {
        res.status(400).send("400: url undefined")
    } else {
        const randomIndex = Math.floor(10000 + Math.random() * 90001)
        connection.query(`CREATE TABLE IF NOT EXISTS url_table
                          (
                              input_url    VARCHAR(512) UNIQUE,
                              output_index INT(10) UNIQUE
                          )`)
        connection.query(`INSERT IGNORE INTO url_table (input_url, output_index)
                          VALUES (?, ?)`, [reqUrl, randomIndex])
        connection.query(`SELECT output_index as url
                          FROM url_table
                          WHERE input_url = ?`, [reqUrl], function (err: any, result: any, fields: any) {
            if (err) res.status(500).send("500: internal server error")
            else res.status(200).send(JSON.parse(JSON.stringify(result)))
        })
    }
})

app.get('/unshorten/:id', (req: Request, res: Response) => {
    let urlIndex = Number(req.params.id)
    if (urlIndex === undefined) {
        res.status(400).send("400: index undefined")
    } else {
        connection.query(`SELECT input_url as url
                          FROM url_table
                          WHERE output_index = ?`, [urlIndex], function (err: any, result: any, fields: any) {
            if (err) res.status(500).send("500: internal server error")
            else if (result.length === 0) res.status(404).send("404: index not found")
            else res.status(200).send(JSON.parse(JSON.stringify(result)))
        })
    }
})

let httpTerminator: { terminate: any; }

export function startServer() {
    connection = startDatabaseConnection()
    let server = app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    })
    httpTerminator = createHttpTerminator({ server})
}

export async function stopServer() {
    stopDatabaseConnection()
    await httpTerminator.terminate()
}

export default app