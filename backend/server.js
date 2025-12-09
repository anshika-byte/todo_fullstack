const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const TODO_FILE = path.join(__dirname, "todoData.json");

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// API Routes
app.get("/api/todos", (req, res) => {
    const data = fs.readFileSync(TODO_FILE, "utf-8");
    res.json(JSON.parse(data));
});

app.post("/api/todos", (req, res) => {
    const todos = JSON.parse(fs.readFileSync(TODO_FILE, "utf-8"));
    const newTodo = { id: Date.now(), text: req.body.text };
    todos.push(newTodo);
    fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
    res.json(newTodo);
});

app.delete("/api/todos/:id", (req, res) => {
    let todos = JSON.parse(fs.readFileSync(TODO_FILE, "utf-8"));
    todos = todos.filter(t => t.id != req.params.id);
    fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
    res.json({ message: "Deleted" });
});

// Root route - serve frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Health check (optional)
app.get("/health", (req, res) => {
    res.send("Server is running!");
});

// Start server
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
