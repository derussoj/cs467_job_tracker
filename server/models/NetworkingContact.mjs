import mongoose from 'mongoose'

const networkingContactSchema = new mongoose.Schema({
  contact_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, ref: 'User', required: true },
  contact_name: { type: String, required: true },
  contact_email: { type: String },
  company_name: { type: String },
  position: { type: String },
  contact_notes: { type: String }
});

  const networkingContact = mongoose.model('NetworkingContact', networkingContactSchema);

// Helper function for findOrCreateFromGoogle and findOrCreateFromGithub
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