import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    googleId: String,
    githubId: String,
    displayName: String,
    email: String
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
}

// Update a user
const updateUser = async () => {
}

// Delete a user
const deleteUser = async () => {

}

export { findOrCreateUserFromGoogle, findOrCreateUserFromGithub, updateUser, deleteUser }
