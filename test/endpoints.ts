import app, {startServer} from "../src";

const request = require('supertest');

beforeAll(() => startServer())

describe('GET /status', () => {
    it('responds with 200', async () => {
        const response = await request(app).get('/status')
        expect(response.statusCode).toBe(200)
    });
});

describe('POST /shorten', () => {
    it('responds with shortened url', async () => {
        const url = 'www.hello-you.com'
        const randomIndex = 71143
        const payload = {'url': url}
        const expectedResponse = [{'url': randomIndex}]
        const response = await request(app).post('/shorten').set('Content-type', 'application/json').send(payload)
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual(expectedResponse)
    });
});

describe('GET /unshorten', () => {
    it('responds with unshortened url', async () => {
        const url = 'www.hello-you.com'
        const expectedResponse = [{'url': url}]
        const response = await request(app).get('/unshorten/71143')
        expect(response.statusCode).toBe(200)
        expect(response.body).toStrictEqual(expectedResponse)
    });
});