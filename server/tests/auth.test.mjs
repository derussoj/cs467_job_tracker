/*
code provided by ChatGPT4 via chat.openai.com

Prompt(s): requested help testing the OAuth login flow
*/

import nock from 'nock'
import request from 'supertest' // Use supertest for HTTP requests
import app from '../app.mjs' // Import the Express app

describe('OAuth Authentication', () => {

  beforeAll(() => {
    // Mocking GitHub OAuth token exchange
    nock('https://github.com')
      .post('/login/oauth/access_token')
      .reply(200, {
        access_token: 'mock_access_token',
        token_type: 'bearer'
      })

    // Mocking GitHub user profile request
    nock('https://api.github.com')
      .get('/user')
      .reply(200, {
        id: 123,
        name: 'Test User',
        // Other user details
      })

    // Mocking Google OAuth token endpoint
    nock('https://oauth2.googleapis.com')
      .post('/token')
      .reply(200, {
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token',
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
        token_type: 'Bearer',
        id_token: 'mock_id_token'
      })

    // Mocking Google user profile information endpoint
    nock('https://www.googleapis.com')
      .get('/oauth2/v2/userinfo')
      .reply(200, {
        id: '12345',
        email: 'testuser@example.com',
        verified_email: true,
        name: 'Test User',
        given_name: 'Test',
        family_name: 'User',
        picture: 'http://example.com/testuser.jpg',
        locale: 'en'
      })
  })

  it('should authenticate user with GitHub OAuth', async () => {
    // Simulate a request to the initial authentication endpoint
    const authResponse = await request(app).get('/auth/github')
    expect(authResponse.status).toBe(302) // Usually, this request gets redirected

    // Simulate the callback from GitHub
    const callbackResponse = await request(app).get('/auth/github/callback')
    expect(callbackResponse.status).toBe(302) // Check the status after callback
    expect(callbackResponse.headers['set-cookie']).toBeDefined()
  })

  it('should authenticate user with Google OAuth', async () => {
    // Simulate a request to the initial authentication endpoint
    const authResponse = await request(app).get('/auth/google')
    expect(authResponse.status).toBe(302) // Usually, this request gets redirected

    // Simulate the callback from Google
    const callbackResponse = await request(app).get('/auth/google/callback')
    expect(callbackResponse.status).toBe(302) // Check the status after callback
    expect(callbackResponse.headers['set-cookie']).toBeDefined()
  })
})
