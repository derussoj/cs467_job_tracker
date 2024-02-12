import mongoose from 'mongoose'

const skillSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    // TODO: add fields
    // Add more fields as needed
}, { timestamps: true }) // Adds createdAt and updatedAt fields

const Skill = mongoose.model('Skill', skillSchema)

// Find all skills for a user
const findSkillsForUser = async (userId) => {
    return Skill.find({ userId: userId }).exec()
}

export { findSkillsForUser }
