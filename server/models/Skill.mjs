import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  skillName: { type: String, required: true }
});

const Skill = mongoose.model('Skill', skillSchema);

const createSkill = async () => {
}

const getSkill = async () => {
}

const updateSkill = async () => {
}

const deleteSkill = async () => {
}

export { createSkill, getSkill, updateSkill, deleteSkill }