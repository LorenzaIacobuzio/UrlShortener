import app, {startServer} from "../src";

const request = require('supertest');

beforeAll(() => startServer())

describe('GET /unshorten', () => {
    it('responds with unshortened url', async () => {
        const expectedUrl = {
            url: 'www.hello-you.com'
        }
        const response = await request(app).get('/unshorten/1')
        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(JSON.parse(JSON.stringify(expectedUrl)))
    });
});