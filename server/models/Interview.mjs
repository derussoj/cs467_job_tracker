import mongoose from 'mongoose'

const interviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicationId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobApplication', required: true },
  companyName: { type: String, ref: 'JobApplication', required: true },
  interviewDateTime: { type: Date },
  interviewLocation: { type: String },
  networkingContactIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'NetworkingContact' }],
  interviewNotes: { type: String }
}, { timestamps: true }) // Adds createdAt and updatedAt fields)

const Interview = mongoose.model('Interview', interviewSchema);

// Create a new interview
const createInterview = async (interviewData) => {

  const newInterview = new Interview({
    userId: interviewData.userId,
    applicationId: interviewData.applicationId,
    companyName: interviewData.companyName,
    interviewDateTime: interviewData.interviewDateTime,
    interviewLocation: interviewData.interviewLocation,
    networkingContactIds: interviewData.networkingContactIds,
    interviewNotes: interviewData.interviewNotes
  })

  return newInterview.save()
}

// Find an interview using its ID
const findInterviewByID = async (_id) => {
  return Interview.findById(_id).exec()
}

// Find all interviews for a user
const findInterviewsForUser = async (userId) => {
  return Interview.find({ userId: userId }).exec()
}

// Update an interview
const updateInterview = async (_id, updatedInterview) => {

  // identify the Interview to update
  const filter = { _id: _id }

  // overwrite the old values
  const update = {
    applicationId: updatedInterview.applicationId,
    companyName: updatedInterview.companyName,
    interviewDateTime: updatedInterview.interviewDateTime,
    interviewLocation: updatedInterview.interviewLocation,
    networkingContactIds: updatedInterview.networkingContactIds,
    interviewNotes: updatedInterview.interviewNotes
  }

  const result = await Interview.updateOne(filter, update)

  return result.modifiedCount
}

// Delete an interview
const deleteInterview = async (_id) => {

  // identify the Interview to delete
  const conditions = { _id: _id }

  const result = await Interview.deleteOne(conditions)

  return result.deletedCount
}

export { createInterview, findInterviewByID, findInterviewsForUser, updateInterview, deleteInterview }
