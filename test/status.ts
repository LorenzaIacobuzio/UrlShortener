import app, {startServer} from "../src";

const request = require('supertest');

//beforeAll(() => startServer())

describe('GET /status', () => {
    it('responds with 200', async () => {
        //const response = await request(app).get('/status')
        //expect(response.statusCode).toBe(200)
    });
});