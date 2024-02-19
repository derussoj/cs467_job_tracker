import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    googleId: { type: String },
    githubId: { type: String },
    displayName: { type: String },
    email: { type: String },
    skills: { type: [String] }
    // Add more fields as needed
}, { timestamps: true }) // Adds createdAt and updatedAt fields

const User = mongoose.model('User', userSchema)

// Find or create a Google user
const findOrCreateUserFromGoogle = async (profile) => {

    const user = await User.findOne({ googleId: profile.id }).exec()

    if (!user) {
        const newUser = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value
            // Add more fields as needed
        })
        return newUser.save()
    } else {
        return user
    }
}

// Find or create a GitHub user
const findOrCreateUserFromGithub = async (profile) => {

    const user = await User.findOne({ githubId: profile.id }).exec()

    if (!user) {
        const newUser = new User({
            githubId: profile.id,
            displayName: profile.username,
            email: profile.emails[0].value
            // Add more fields as needed
        })
        return newUser.save()
    } else {
        return user
    }
}

// Helper function for findOrCreateFromGoogle and findOrCreateFromGithub
const findOrCreateUser = async () => {
    // TODO: move duplicate code here from findOrCreateUserFromGoogle and findOrCreateUserFromGithub
    // or create a generic function that takes an additional parameter (e.g. "google" or "github")
}

// Find a user using their ID
const findUserByID = async (_id) => {
    return User.findById(_id).exec()
}

// Update a user
const updateUser = async (_id, updatedUser) => {

    // identify the User to update
    const filter = { _id: _id }

    // overwrite the old values
    const update = {
        skills: updatedUser.skills
        // Add more fields as needed
    }

    const result = await User.updateOne(filter, update)

    return result.modifiedCount
}

// Delete a user
const deleteUser = async (_id) => {

    // identify the User to delete
    const conditions = { _id: _id }

    const result = await User.deleteOne(conditions)

    return result.deletedCount
}

export { findOrCreateUserFromGoogle, findOrCreateUserFromGithub, findUserByID, updateUser, deleteUser }
