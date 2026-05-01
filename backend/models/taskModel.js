const mongoose = require('mongoose');

// This is our task schema
// We need title, description, and status
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt
});

module.exports = mongoose.model('Task', taskSchema);
