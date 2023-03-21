import app, {startServer, stopServer} from "../src";

const request = require('supertest');

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
        const randomIndex = 61509
        const payload = {'url': url}
        const expectedResponse = [{'url': randomIndex}]
        const response = await request(app).post('/shorten').set('Content-type', 'application/json').send(payload)
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual(expectedResponse)
    })
})

describe('GET /unshorten', () => {
    it('responds with unshortened url', async () => {
        const url = 'www.hello-you.com'
        const index = '61509'
        const expectedResponse = [{'url': url}]
        const response = await request(app).get(`/unshorten/${index}`)
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual(expectedResponse)
    })
})
