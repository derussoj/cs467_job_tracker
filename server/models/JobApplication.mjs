import mongoose from 'mongoose'

const jobApplicationSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: String, required: true },
    job_title: { type: String, required: true },
    application_date: { type: Date, required: true },
    application_status: { type: String, required: true },
    job_description: { type: String },
    salary: { type: String },  // Number?
    location: { type: String },
    application_notes: { type: String }
}, { timestamps: true }) // Adds createdAt and updatedAt fields

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema)

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

// Consider replacing "find" with "get" or "retrieve" in findJobApplicationByID and findJobApplicationsForUser

// Find a job application using its ID
const findJobApplicationByID = async (_id) => {
    return JobApplication.findById(_id).exec()
}

// Find all job applications for a user
const findJobApplicationsForUser = async (userId) => {
    return JobApplication.find({ userId: userId }).exec()
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

export { createJobApplication, findJobApplicationByID, findJobApplicationsForUser, updateJobApplication, deleteJobApplication }
