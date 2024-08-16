const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 3000;  // Use environment variable for port if available
const { createToDo } = require("./input-spec");
const { updateToDo } = require("./input-spec");
const { connectDB, todo } = require("./db.js"); // Ensure correct import

const app = express();

app.use(express.json());

// To post the todo's on the app backend
app.post('/to-do', async function (req, res) {
    const createPayload = req.body;
    const parsedPayload = createToDo.safeParse(createPayload);

    if (!parsedPayload.success) {
        return res.status(400).json({ msg: "You sent the wrong inputs" });  // Changed to 400 Bad Request
    }

    try {
        await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        });
        res.json({ msg: "ToDo created !!" });
    } catch (error) {
        console.error('Error in POST /to-do:', error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
});

// To get the already existing to-do's on the backend
app.get('/get-todo', async function (req, res) {
    try {
        const todos = await todo.find({});
        res.json({ todos });
    } catch (error) {
        console.error('Error in GET /get-todo:', error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
});

// To update to-do's and mark them as done
app.put('/mark-asDone', async function (req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateToDo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        return res.status(400).json({ msg: "Couldn't update the todo" });  // Changed to 400 Bad Request
    }

    try {
        await todo.findByIdAndUpdate(req.body._id, { completed: true });
        res.json({ msg: "The update was successful !!" });
    } catch (error) {
        console.error('Error in PUT /mark-asDone:', error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
});

// Database connection and server start
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error.message);
        process.exit(1);
    });
