import app, {startServer} from "../src";

const request = require('supertest');

//beforeAll(() => startServer())

describe('POST /shorten', () => {
    it('responds with shortened url', async () => {
        //const url = 'www.hello-you.com'
        //const payload = {'url': url}
        //const response = await request(app).post('/shorten').set('Content-type', 'application/json').send(payload)
        //expect(response.statusCode).toBe(200)
        //expect(response.body.url).toBe(url + '/1')
    });
});