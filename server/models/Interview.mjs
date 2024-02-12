import mongoose from 'mongoose'

const interviewSchema = new mongoose.Schema({
  interview_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, ref: 'User', required: true },
  application_id: { type: Number, ref: 'Job_Application', required: true },
  interview_date: { type: Date },
  interview_time: { type: String },
  interview_location: { type: String },
  interviewer_name: { type: String },
  interview_notes: { type: String }
});

  const Interview = mongoose.model('Interview', interviewSchema);

// Helper function for findOrCreateFromGoogle and findOrCreateFromGithub
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