import request from 'supertest'
import app from '../app.mjs'
import * as User from '../models/User.mjs'
import mongoose from 'mongoose'

// Test data
const mockGithubProfile = {
    id: 'github123',
    username: 'johndoe',
    emails: [{ value: 'johndoe@example.com' }]
}
const mockGoogleProfile = {
    id: 'google123',
    displayName: 'John Doe',
    emails: [{ value: 'johndoe@example.com' }]
}

describe('User Model', () => {

    afterAll(async () => {
        // clear the database
        const collections = await mongoose.connection.db.collections()
        for (let collection of collections) {
            await collection.deleteMany({})
        }
    })

    it('should create a new GitHub user when the user does not exist', async () => {

        expect(mockGithubProfile._id).toBeUndefined()

        const user = await User.findOrCreateUserFromGithub(mockGithubProfile)

        expect(user).toBeDefined()
        expect(user.githubId).toBe(mockGithubProfile.id)
        expect(user.displayName).toBe(mockGithubProfile.username)
        expect(user.email).toBe(mockGithubProfile.emails[0].value)
        expect(user.isNew).toBe(false) // isNew is false when document is saved

        // Store the ID for further tests
        mockGithubProfile._id = user._id
    })

    it('should find the existing GitHub user', async () => {

        expect(mockGithubProfile._id).toBeDefined()

        const user = await User.findOrCreateUserFromGithub(mockGithubProfile)

        expect(user).toBeDefined()
        expect(user.githubId).toBe(mockGithubProfile.id)
        expect(user.displayName).toBe(mockGithubProfile.username)
        expect(user.email).toBe(mockGithubProfile.emails[0].value)
        expect(user.isNew).toBe(false) // isNew is false when document is saved
    })

    it('should create a new Google user when the user does not exist', async () => {

        expect(mockGoogleProfile._id).toBeUndefined()

        const user = await User.findOrCreateUserFromGoogle(mockGoogleProfile)

        expect(user).toBeDefined()
        expect(user.googleId).toBe(mockGoogleProfile.id)
        expect(user.displayName).toBe(mockGoogleProfile.displayName)
        expect(user.email).toBe(mockGoogleProfile.emails[0].value)
        expect(user.isNew).toBe(false) // isNew is false when document is saved

        // Store the ID for further tests
        mockGoogleProfile._id = user._id
    })

    it('should find the existing Google user', async () => {

        expect(mockGoogleProfile._id).toBeDefined()

        const user = await User.findOrCreateUserFromGoogle(mockGoogleProfile)

        expect(user).toBeDefined()
        expect(user.googleId).toBe(mockGoogleProfile.id)
        expect(user.displayName).toBe(mockGoogleProfile.displayName)
        expect(user.email).toBe(mockGoogleProfile.emails[0].value)
        expect(user.isNew).toBe(false) // isNew is false when document is saved
    })

    it('should find the GitHub user using their ID', async () => {
        const user = await User.findUserByID(mockGithubProfile._id)

        expect(user).toBeDefined()
        expect(user.githubId).toBe(mockGithubProfile.id)
        expect(user.displayName).toBe(mockGithubProfile.username)
        expect(user.email).toBe(mockGithubProfile.emails[0].value)
        expect(user.isNew).toBe(false) // isNew is false when document is saved
    })

    it('should find the Google user using their ID', async () => {
        const user = await User.findUserByID(mockGoogleProfile._id)

        expect(user).toBeDefined()
        expect(user.googleId).toBe(mockGoogleProfile.id)
        expect(user.displayName).toBe(mockGoogleProfile.displayName)
        expect(user.email).toBe(mockGoogleProfile.emails[0].value)
        expect(user.isNew).toBe(false) // isNew is false when document is saved
    })

    it('should update an existing user', async () => {
        const updatedData = { skills: ["Test Skill 1", "Test Skill 2"] }
        const response = await request(app)
            .put(`/users/${mockGithubProfile._id}`)
            .send(updatedData)

        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(1)
    })

    it('should delete the GitHub user', async () => {
        const response = await request(app)
            .delete(`/users/${mockGithubProfile._id}`)

        expect(response.statusCode).toBe(204)
    })

    it('should delete the Google user', async () => {
        const response = await request(app)
            .delete(`/users/${mockGoogleProfile._id}`)

        expect(response.statusCode).toBe(204)
    })
})
