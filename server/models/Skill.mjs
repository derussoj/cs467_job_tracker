import mongoose from 'mongoose'

const skillSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    skillName: { type: String, required: true }
    // Add more fields as needed
}, { timestamps: true }) // Adds createdAt and updatedAt fields

const Skill = mongoose.model('Skill', skillSchema)

// Create a new skill
const createSkill = async () => {
}

// Consider replacing "find" with "get" or "retrieve" in findSkillsForUser

// Find all skills for a user
const findSkillsForUser = async (userId) => {
    return Skill.find({ userId: userId }).exec()
}

// Update a skill
const updateSkill = async () => {
}

// Delete a skill
const deleteSkill = async () => {
}

export { createSkill, findSkillsForUser, updateSkill, deleteSkill }
