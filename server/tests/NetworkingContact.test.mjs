import request from 'supertest'
import app from '../app.mjs'
import { Types } from 'mongoose'

// Test data
const testContactData = {
    userId: new Types.ObjectId(),
    contactName: "Test Contact",
    contactEmail: "test.contact@test.com",
    companyName: "Test Company",
    position: "Test Position",
    contactNotes: "Test contact notes"
}

describe('NetworkingContact Model', () => {

    it('should create a new networking contact', async () => {
        const response = await request(app)
            .post('/networkingContacts')
            .send(testContactData)

        expect(response.statusCode).toBe(201)
        expect(response.body.userId).toBe(testContactData.userId.toString())
        expect(response.body.contactName).toBe(testContactData.contactName)
        expect(response.body.contactEmail).toBe(testContactData.contactEmail)
        expect(response.body.companyName).toBe(testContactData.companyName)
        expect(response.body.position).toBe(testContactData.position)
        expect(response.body.contactNotes).toBe(testContactData.contactNotes)

        // Store the ID for further tests (like update or delete)
        testContactData._id = response.body._id
    })

    it('should retrieve a networking contact', async () => {
        const response = await request(app)
            .get(`/networkingContacts/${testContactData._id}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.userId).toBe(testContactData.userId.toString())
        expect(response.body.contactName).toBe(testContactData.contactName)
        expect(response.body.contactEmail).toBe(testContactData.contactEmail)
        expect(response.body.companyName).toBe(testContactData.companyName)
        expect(response.body.position).toBe(testContactData.position)
        expect(response.body.contactNotes).toBe(testContactData.contactNotes)
    })

    it('should retrieve all networking contacts for a user', async () => {
        const response = await request(app)
            .get(`/networkingContacts/user/${testContactData.userId}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0].userId).toBe(testContactData.userId.toString())
        expect(response.body[0].contactName).toBe(testContactData.contactName)
        expect(response.body[0].contactEmail).toBe(testContactData.contactEmail)
        expect(response.body[0].companyName).toBe(testContactData.companyName)
        expect(response.body[0].position).toBe(testContactData.position)
        expect(response.body[0].contactNotes).toBe(testContactData.contactNotes)
    })

    it('should update an existing networking contact', async () => {
        const updatedData = { ...testContactData, companyName: 'New Test Company' }
        const response = await request(app)
            .put(`/networkingContacts/${testContactData._id}`)
            .send(updatedData)

        expect(response.statusCode).toBe(200)
        expect(response.body).toBe(1)
    })

    it('should delete a networking contact', async () => {
        const response = await request(app)
            .delete(`/networkingContacts/${testContactData._id}`)

        expect(response.statusCode).toBe(204)
    })
})
