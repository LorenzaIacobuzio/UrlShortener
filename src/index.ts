import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = 8080
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("All is good")
})

app.post('/shorten', (req: Request, res: Response) => {
    let reqUrl = req.body.url
    if (reqUrl === undefined) {
        res.status(400).send("400: url undefined")
    } else {
        try {
            res.status(200).send({url: reqUrl + '/1'})
        } catch (error) {
            res.status(500).send("500: internal server error")
        }
    }
})