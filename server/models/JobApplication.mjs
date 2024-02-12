import mongoose from 'mongoose'

const jobApplicationSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    company: String,
    position: String,
    applicationDate: Date
    // Add more fields as needed
}, { timestamps: true }) // Adds createdAt and updatedAt fields

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema)

// Find a job application using its ID
const findJobApplicationByID = async (_id) => {
    return JobApplication.findById(_id).exec()
}

// Find all job applications for a user
const findJobApplicationsForUser = async (userId) => {
    return JobApplication.find({ userId: userId }).exec()
}

// Create a new job application
const createJobApplication = async (userId, company, position, applicationDate) => {

    const newApplication = new JobApplication({
        userId: userId,
        company: company,
        position: position,
        applicationDate: applicationDate
        // Add more fields as needed
    })

    return newApplication.save()
}

// Update a job application
const updateJobApplication = async (_id) => { // TODO: add parameters

    // identify the JobApplication to update
    const filter = { _id: _id }

    // overwrite the old values
    const update = {} // TODO: add fields to update

    const result = await JobApplication.updateOne(filter, update)

    return result.modifiedCount
}

// Delete a job application
const deleteJobApplication = async (_id) => {

    // identify the JobApplication to delete
    const conditions = { _id: _id }

    const result = await JobApplication.deleteOne(conditions)

    return result.deletedCount
}

export { findJobApplicationByID, findJobApplicationsForUser, createJobApplication, updateJobApplication, deleteJobApplication }
