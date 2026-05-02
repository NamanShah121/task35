const Task = require('../models/taskModel');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

const createTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    try {
        const newTask = new Task({ title, description });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(500).json({ message: 'Error creating task' });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Just update whatever is in req.body
        const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Update failed' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Task.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Deleted task', id: id });
    } catch (err) {
        res.status(500).json({ message: 'Delete failed' });
    }
};

const searchTasks = async (req, res) => {
    const query = req.query.q;
    try {
        // Simple search logic
        const tasks = await Task.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Search error' });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    searchTasks
};
