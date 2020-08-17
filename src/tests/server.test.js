import { app } from '../server/app';
const request = require('supertest');
const test_destination='saudi';


describe("Test Get Endpoints", () => {
    test("is it receive get request on geonames route correctly?", async () => {
        const response = await request(app).get(`/geonames/${test_destination}`);
        expect(response.statusCode).toBe(200);
    });

    test("is it receive get request on pixabay route correctly?", async () => {
        const response = await request(app).get(`/pixabay/${test_destination}`);
        expect(response.statusCode).toBe(200);
    });
});