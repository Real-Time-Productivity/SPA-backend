const Task = require("../models/Task");
// Create and Save a new Task
exports.postCreateTask = (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({ message: "Content can not be empty!" });
    } else {
        // Create a Task
        const task = new Task({
            title: req.body.title,
            class: req.body.class,
            completed: req.body.completed,
            date: req.body.date,
            duedate: req.body.duedate,
        });
        // Save Task in the database
        task.save(task)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Task.",
                });
            });
    }
};
// Retrieve all Task from the database.
exports.getAllTask = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Task.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tasks.",
            });
        });
};
// Update a Task by the id in the request
exports.putUpdateTask = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!",
        });
    }
    const id = req.params.id;
    Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Task with id=${id}. Maybe Task was not found!`,
                });
            } else res.send({ message: "Task was updated successfully." });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Task with id=" + id,
            });
        });
};
// Delete a Task with the specified id in the request
exports.deleteTask = (req, res) => {
    const id = req.params.id;
    Task.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
                });
            } else {
                res.send({
                    message: "Task was deleted successfully!",
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id,
            });
        });
};
