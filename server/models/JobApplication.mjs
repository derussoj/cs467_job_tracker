import mongoose from 'mongoose'

const jobApplicationSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },
    applicationDate: { type: Date, required: true },
    applicationStatus: { type: String, required: true },
    jobDescription: { type: String },
    salary: { type: Number },
    location: { type: String },
    applicationNotes: { type: String }
}, { timestamps: true }) // Adds createdAt and updatedAt fields

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema)

// Create a new job application
const createJobApplication = async (applicationData) => {

    const newApplication = new JobApplication({
        userId: applicationData.userId,
        company: applicationData.company,
        jobTitle: applicationData.jobTitle,
        applicationDate: applicationData.applicationDate,
        applicationStatus: applicationData.applicationStatus,
        jobDescription: applicationData.jobDescription,
        salary: applicationData.salary,
        location: applicationData.location,
        applicationNotes: applicationData.applicationNotes
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
const updateJobApplication = async (_id, updatedApplication) => {

    // identify the JobApplication to update
    const filter = { _id: _id }

    // overwrite the old values
    const update = {
        userId: updatedApplication.userId,
        company: updatedApplication.company,
        jobTitle: updatedApplication.jobTitle,
        applicationDate: updatedApplication.applicationDate,
        applicationStatus: updatedApplication.applicationStatus,
        jobDescription: updatedApplication.jobDescription,
        salary: updatedApplication.salary,
        location: updatedApplication.location,
        applicationNotes: updatedApplication.applicationNotes
    }

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
