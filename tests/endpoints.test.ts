import app, {startServer, stopServer} from "../src"
import {afterAll, beforeAll, describe, expect, it} from 'vitest'

const request = require('supertest')
const randomIndex = '77844'
const port = 8080
const host = 'localhost'
const baseUrl = 'http://' + host + ':' + port.toString() + '/'

beforeAll(async() => await startServer())
afterAll(async() => await stopServer())

describe('GET /status', () => {
    it('responds with 200', async () => {
        const response = await request(app).get('/status')
        expect(response.statusCode).toBe(200)
    })
})

describe('POST /shorten', () => {
    it('responds with shortened url', async () => {
        const url = 'www.hello-you.com'
        const payload = {'url': url}
        const expectedResponse = baseUrl + randomIndex
        const response = await request(app).post('/shorten').set('Content-type', 'application/json').send(payload)
        expect(response.statusCode).toBe(200)
        expect(response.text).toStrictEqual(expectedResponse)
    })
})

describe('GET /unshorten', () => {
    it('responds with unshortened url', async () => {
        const expectedResponse = 'www.hello-you.com'
        const response = await request(app).get(`/unshorten/${randomIndex}`)
        expect(response.statusCode).toBe(200)
        expect(response.text).toStrictEqual(expectedResponse)
    })
})
