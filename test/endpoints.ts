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
        const payload = {'url': url}
        const response = await request(app).post('/shorten').set('Content-type', 'application/json').send(payload)
        expect(response.statusCode).toBe(200)
        expect(response.body.url).toBe(url + '/1')
    });
});

describe('GET /unshorten', () => {
    it('responds with unshortened url', async () => {
        const url = 'www.hello-you.com'
        const payload = {'url': url}
        const response = await request(app).get('/unshorten/1')
        expect(response.statusCode).toBe(200)
        //expect(response.body).toBe(JSON.parse(JSON.stringify(payload)))
    });
});