const request = require('supertest');
const registerLogin = require("../registerLoginErr")
const app = require('../main');  // Adjust the path to your main.js

describe('Server Tests', () => {
    

  const routesToTest = [
    '/',
    '/createPool',
    '/demo',
    '/register',
    '/login',
  ]

  routesToTest.forEach((route) => {
    it(`responds to ${route}`,async () => {
      const response = await request(app).get(route)

      expect(response.statusCode).toBe(200); 
      expect(response.headers['content-type']).toMatch(/text\/html/)
    })
  })

});

