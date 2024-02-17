import mongoose from 'mongoose'

const networkingContactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contactName: { type: String, required: true },
  contactEmail: { type: String },
  companyName: { type: String },
  position: { type: String },
  contactNotes: { type: String }
});

const networkingContact = mongoose.model('NetworkingContact', networkingContactSchema);

const createNetworkingContact = async () => {
}

const getNetworkingContact = async () => {
}

// Update a user
const updateNetworkingContact = async () => {
}

// Delete a user
const deleteNetworkingContact = async () => {

}

export { createNetworkingContact, getNetworkingContact, updateNetworkingContact, deleteNetworkingContact }