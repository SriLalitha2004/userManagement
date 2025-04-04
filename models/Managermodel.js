const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    manager_id: { type: String, required: true, unique: true, default: uuidv4 },
    is_active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Manager', managerSchema);