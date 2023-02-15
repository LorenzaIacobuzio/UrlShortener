import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = 8080
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lorenza',
    database: 'url_shortener_db',
    port: 49155
})

connection.connect((err: any) => {
    if (err) {
        console.log("Database Connection Failed !!!", err)
    } else {
        console.log("connected to Database")
    }
});

module.exports = connection

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

app.get('/status', (req: Request, res: Response) => {
    res.status(200).send("200: all is good")
})

app.post('/shorten', (req: Request, res: Response) => {
    let reqUrl = req.body.url
    if (reqUrl === undefined) {
        res.status(400).send("400: url undefined")
    } else {
        try {
            connection.query(`CREATE TABLE IF NOT EXISTS url_table (input_url VARCHAR(512), output_url INT(10))`)
            connection.query(`INSERT INTO url_table (input_url, output_url) VALUES(?, ?)`, [reqUrl, 1])
            res.status(200).send({url: reqUrl + '/1'})
        } catch (error) {
            res.status(500).send("500: internal server error")
        }
    }
})

app.get('/unshorten/:id', (req: Request, res: Response) => {
    let urlIndex = Number(req.params.id)
    if (urlIndex === undefined) {
        res.status(400).send("400: index undefined")
    } else {
        connection.query(`SELECT input_url
                          FROM url_table
                          WHERE output_url = ?`, [urlIndex], function (err: any, result: any, fields: any) {
            if (err) res.status(500).send("500: internal server error")
            else if (result.length === 0) res.status(404).send("404: index not found")
            else res.status(200).send(JSON.parse(JSON.stringify(result)))
        })
    }
})