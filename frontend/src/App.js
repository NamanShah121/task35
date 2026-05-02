import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [search, setSearch] = useState('');

  // Local URL for testing
  const url = 'http://localhost:5000/api/tasks';

  // Get all tasks when page loads
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const res = await axios.get(url);
      setTasks(res.data);
    } catch (e) {
      console.log('could not get tasks');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === '' || desc === '') {
      alert('please fill in everything');
      return;
    }

    try {
      const res = await axios.post(url, {
        title: title,
        description: desc
      });
      // Add the new task to the list
      setTasks([...tasks, res.data]);
      setTitle('');
      setDesc('');
    } catch (e) {
      alert('failed to add');
    }
  };

  const toggleDone = async (id, status) => {
    try {
      const res = await axios.put(`${url}/${id}`, {
        completed: !status
      });
      // update the task in the state
      const newTasks = tasks.map(t => {
        if (t._id === id) return res.data;
        return t;
      });
      setTasks(newTasks);
    } catch (e) {
      console.log('update error');
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (e) {
      console.log('delete error');
    }
  };

  const handleSearch = async (val) => {
    setSearch(val);
    if (val === '') {
      getTasks();
    } else {
      try {
        const res = await axios.get(`${url}/search?q=${val}`);
        setTasks(res.data);
      } catch (e) {
        console.log('search failed');
      }
    }
  };

  return (
    <div className="App">
      <h1>My To-Do App</h1>
      
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="What needs to be done?" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br/>
          <textarea 
            placeholder="Add some details..." 
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <br/>
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className="search-box">
        <input 
          type="text" 
          placeholder="Search for a task..." 
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="task-list">
        {tasks.length === 0 && <p>No tasks yet!</p>}
        {tasks.map(task => (
          <div key={task._id} className="task">
            <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <button onClick={() => toggleDone(task._id, task.completed)}>
              {task.completed ? 'Undo' : 'Done'}
            </button>
            <button onClick={() => removeTask(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
