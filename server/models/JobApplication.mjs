import mongoose from 'mongoose'

const jobApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  applicationDate: { type: Date, required: true },
  applicationStatus: { type: String, required: true },
  jobDescription: { type: String },
  salary: { type: String },
  location: { type: String },
  applicationNotes: { type: String }
});

const jobApplication = mongoose.model('JobApplication', jobApplicationSchema);

const createJobApplication = async () => {
}

const getJobApplication = async () => {
}

const updateJobApplication = async () => {
}

const deleteJobApplication = async () => {

}

export { createJobApplication, getJobApplication, updateJobApplication, deleteJobApplication }