import mongoose from 'mongoose'

const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication', required: true },
  companyName: { type: String, ref: 'JobApplication', required: true },
  interviewDateTime: { type: Date },
  interviewLocation: { type: String },
  networkingContactIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NetworkingContact'}],
  interviewNotes: { type: String }
});

const Interview = mongoose.model('Interview', interviewSchema);

// TODO: Add functions for get All Interviews
const createInterview = async () => {
}

const getInterview = async () => {
}

// Update a user
const updateInterview = async () => {
}

// Delete a user
const deleteInterview = async () => {
}

export { createInterview, getInterview, updateInterview, deleteInterview }