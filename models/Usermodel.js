const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    user_id: { type: String, default: uuidv4, unique: true },
    full_name: { type: String, required: true },
    mob_num: { type: String, required: true, match: [/^\+?[0-9]{10,12}$/, 'Invalid mobile number'] },
    pan_num: { type: String, required: true, uppercase: true, match: [/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN number']},
    manager_id: { type: String, required: true, ref:'Manager' },
    is_active: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);