import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api/tasks';

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all tasks
    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch tasks');
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Add a new task
    const addTask = async (e) => {
        e.preventDefault();
        if (!title || !description) return alert('Fill all fields');

        try {
            const response = await axios.post(API_URL, { title, description });
            setTasks([response.data, ...tasks]);
            setTitle('');
            setDescription('');
        } catch (err) {
            setError('Failed to add task');
        }
    };

    // Toggle task completion
    const toggleComplete = async (task) => {
        try {
            const response = await axios.put(`${API_URL}/${task._id}`, {
                completed: !task.completed
            });
            setTasks(tasks.map(t => t._id === task._id ? response.data : t));
        } catch (err) {
            setError('Failed to update task');
        }
    };

    // Delete a task
    const deleteTask = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    // Search tasks
    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim() === '') {
            fetchTasks();
            return;
        }
        try {
            const response = await axios.get(`${API_URL}/search?q=${value}`);
            setTasks(response.data);
        } catch (err) {
            setError('Search failed');
        }
    };

    return (
        <div className="container">
            <h1>My To-Do List</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form className="task-form" onSubmit={addTask}>
                <input 
                    type="text" 
                    placeholder="Task Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea 
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button type="submit">Add Task</button>
            </form>

            <input 
                type="text" 
                className="search-bar" 
                placeholder="Search tasks..." 
                value={searchTerm}
                onChange={handleSearch}
            />

            {loading ? <p>Loading...</p> : (
                <ul className="task-list">
                    {tasks.map(task => (
                        <li key={task._id} className="task-item">
                            <div className={`task-info ${task.completed ? 'completed' : ''}`}>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                            </div>
                            <div className="actions">
                                <button 
                                    className="complete-btn" 
                                    onClick={() => toggleComplete(task)}
                                >
                                    {task.completed ? 'Undo' : 'Done'}
                                </button>
                                <button 
                                    className="delete-btn" 
                                    onClick={() => deleteTask(task._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
