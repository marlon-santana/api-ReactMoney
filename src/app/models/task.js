const mongoose = require('../../database');
const bcrypt = require('bcryptjs');


const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    project: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        require: true,
    },
    completeed: {
        type: Boolean,
        require: true,
        default: false,
    },
    tasks: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Task',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;