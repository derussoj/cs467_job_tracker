import mongoose from 'mongoose'

const networkContactSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    // TODO: add fields
    // Add more fields as needed
}, { timestamps: true }) // Adds createdAt and updatedAt fields

const NetworkContact = mongoose.model('NetworkContact', networkContactSchema)

// Find all network contacts for a user
const findContactsForUser = async (userId) => {
    return NetworkContact.find({ userId: userId }).exec()
}

export { findContactsForUser }
