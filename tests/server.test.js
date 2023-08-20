const request = require('supertest');
const app = require('../main');  // Adjust the path to your main.js

describe('Server Tests', () => {
  it('responds to /', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  // Add more test cases as needed
});
