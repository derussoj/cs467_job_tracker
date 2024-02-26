import request from 'supertest'
import app from '../app.mjs'
import { Types } from 'mongoose'

// Test data
const testApplicationData = {
    userId: new Types.ObjectId(),
    company: "Test Company",
    jobTitle: "Test Job Title",
    applicationDate: new Date(),
    applicationStatus: "Applied",
    jobDescription: "Test job description",
    salary: 100000,
    location: "Test location",
    applicationNotes: "Test application notes"
}

// Test for creating a job application
describe('POST /jobApplications', () => {
    it('should create a new job application', async () => {
        const response = await request(app)
            .post('/jobApplications')
            .send(testApplicationData)

        expect(response.statusCode).toBe(201)
        expect(response.body.userId).toBe(testApplicationData.userId.toString())
        expect(response.body.company).toBe(testApplicationData.company)
        expect(response.body.jobTitle).toBe(testApplicationData.jobTitle)
        expect(response.body.applicationDate).toBe(testApplicationData.applicationDate.toISOString())
        expect(response.body.salary).toBe(testApplicationData.salary)

        // Store the ID for further tests (like update or delete)
        testApplicationData._id = response.body._id
    })
})

// Test for retrieving a job application
describe('GET /jobApplications/:id', () => {
    it('should retrieve a job application', async () => {
        const response = await request(app)
            .get(`/jobApplications/${testApplicationData._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.userId).toBe(testApplicationData.userId.toString())
        expect(response.body.company).toBe(testApplicationData.company)
        expect(response.body.jobTitle).toBe(testApplicationData.jobTitle)
        expect(response.body.applicationDate).toBe(testApplicationData.applicationDate.toISOString())
        expect(response.body.salary).toBe(testApplicationData.salary)
    })
})

// Test for retrieving all job applications for a user
describe('GET /jobApplications/user/:userId', () => {
    it('should retrieve all job applications for a user', async () => {
        const response = await request(app)
            .get(`/jobApplications/user/${testApplicationData.userId}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0].userId).toBe(testApplicationData.userId.toString())
        expect(response.body[0].company).toBe(testApplicationData.company)
        expect(response.body[0].jobTitle).toBe(testApplicationData.jobTitle)
        expect(response.body[0].applicationDate).toBe(testApplicationData.applicationDate.toISOString())
        expect(response.body[0].salary).toBe(testApplicationData.salary)
    })
})

// Test for updating a job application
describe('PUT /jobApplications/:id', () => {
    it('should update an existing job application', async () => {
        const updatedData = { ...testApplicationData, company: 'New Test Company' }
        const response = await request(app)
            .put(`/jobApplications/${testApplicationData._id}`)
            .send(updatedData)

        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(1)
    })
})

// Test for deleting a job application
describe('DELETE /jobApplications/:id', () => {
    it('should delete a job application', async () => {
        const response = await request(app)
            .delete(`/jobApplications/${testApplicationData._id}`)

        expect(response.statusCode).toBe(204)
    })
})
