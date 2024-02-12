import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  skill_id: { type: Number, required: true, unique: true },
  skill_name: { type: String, required: true }
});

const Skill = mongoose.model('Skill', skillSchema);

const createSkill = async () => {
}

const getSkill = async () => {
}

// Update a user
const updateSkill = async () => {
}

// Delete a user
const deleteSkill = async () => {
}

export { createSkill, getSkill, updateSkill, deleteSkill }