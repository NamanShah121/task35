require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // This allows us to send JSON data

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// API Routes
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

console.log('Connecting to:', MONGO_URI);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('Error: ', err.message);
    });
