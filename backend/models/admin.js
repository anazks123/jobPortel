
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'restricted'],
        required: true
    },
});

module.exports = User = mongoose.model('admin', adminSchema);