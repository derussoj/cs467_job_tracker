import mongoose from 'mongoose'

const jobApplicationSchema = new mongoose.Schema({
    application_id: { type: Number, required: true, unique: true },
    user_id: { type: Number, ref: 'User', required: true },
    company_name: { type: String, required: true },
    job_title: { type: String, required: true },
    application_date: { type: Date, required: true },
    application_status: { type: String, required: true },
    job_description: { type: String },
    salary: { type: String },
    location: { type: String },
    application_notes: { type: String }
  });

  const jobApplication = mongoose.model('JobApplication', jobApplicationSchema);

// Helper function for findOrCreateFromGoogle and findOrCreateFromGithub
const createJobApplication = async () => {
}

const getJobApplication = async () => {
}

// Update a user
const updateJobApplication = async () => {
}

// Delete a user
const deleteJobApplication = async () => {

}

export { createJobApplication, getJobApplication, updateJobApplication, deleteJobApplication }