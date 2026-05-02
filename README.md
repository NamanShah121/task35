# My To-Do List Project
This is a basic To-Do app I built using the MERN stack (MongoDB, Express, React, and Node). I made this to learn how to connect a frontend to a database.

## How to Run It

# 1. Backend (The Server)
Go into the backend folder: cd backend
Install the stuff needed: npm install
Create a .env file and put this inside:
  PORT=5000
  MONGO_URI=your_mongodb_url_here
Start it up: npm start

# 2. Frontend (The UI)
Go into the frontend folder: cd frontend
Install dependencies: npm install
Start the app: npm start

# What I Learned
CORS: I had a lot of trouble getting the frontend to talk to the backend. I had to install the cors package to fix it.
React State: Using useState to update the list of tasks was tricky. I learned I have to use to add things to the list correctly.
Search: I used regex in MongoDB to make the search work for both titles and descriptions.

# API Info
GET /api/tasks - Gets all my tasks.
POST /api/tasks - Adds a new task (need title and description).
PUT /api/tasks/:id - Updates a task (like marking it done).
DELETE /api/tasks/:id - Deletes a task.
GET /api/tasks/search?q=... - Search for tasks.

# Testing
I used Postman to make sure all my routes were working before I started on the React part. I checked if I could create, update, and delete tasks from there first.

# Troubleshooting
If the database doesn't connect, make sure your MongoDB URI is correct in the .env.
If the frontend won't load anything, check if the backend server is actually running on port 5000.