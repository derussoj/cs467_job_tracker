import mongoose from 'mongoose'

const networkingContactSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contactName: { type: String, required: true },
  contactEmail: { type: String },
  companyName: { type: String },
  position: { type: String },
  contactNotes: { type: String }
}, { timestamps: true }) // Adds createdAt and updatedAt fields)

const NetworkingContact = mongoose.model('NetworkingContact', networkingContactSchema);

// Create a new networking contact
const createNetworkingContact = async (contactData) => {

  const newContact = new NetworkingContact({
    userId: contactData.userId,
    contactName: contactData.contactName,
    contactEmail: contactData.contactEmail,
    companyName: contactData.companyName,
    position: contactData.position,
    contactNotes: contactData.contactNotes
  })

  return newContact.save()
}

// Find a networking contact using its ID
const findNetworkingContactByID = async (_id) => {
  return NetworkingContact.findById(_id).exec()
}

// Find all networking contacts for a user
const findNetworkingContactsForUser = async (userId) => {
  return NetworkingContact.find({ userId: userId }).exec()
}

// Update a networking contact
const updateNetworkingContact = async (_id, updatedContact) => {

  // identify the NetworkingContact to update
  const filter = { _id: _id }

  // overwrite the old values
  const update = {
    userId: updatedContact.userId,
    contactName: updatedContact.contactName,
    contactEmail: updatedContact.contactEmail,
    companyName: updatedContact.companyName,
    position: updatedContact.position,
    contactNotes: updatedContact.contactNotes
  }

  const result = await NetworkingContact.updateOne(filter, update)

  return result.modifiedCount
}

// Delete a networking contact
const deleteNetworkingContact = async (_id) => {

  // identify the NetworkingContact to delete
  const conditions = { _id: _id }

  const result = await NetworkingContact.deleteOne(conditions)

  return result.deletedCount
}

export { createNetworkingContact, findNetworkingContactByID, findNetworkingContactsForUser, updateNetworkingContact, deleteNetworkingContact }
