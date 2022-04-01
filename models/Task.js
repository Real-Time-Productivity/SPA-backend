const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    duedate: {
        type: Date,
    },
});

const Task = mongoose.model("task", TaskSchema);

module.exports = Task;
