const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask, searchTasks } = require('../controllers/taskController');

// Search route should be before the /:id route
router.get('/search', searchTasks);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
