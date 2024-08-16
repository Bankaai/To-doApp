require('dotenv').config();
const mongoose = require("mongoose");


const mongodb_URI = process.env.MONGODB_URI;

console.log('MongoDB URI:', mongodb_URI);  // Add this line for debugging

// Now connect the MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(mongodb_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Database connected successfully");
    } catch (error) {
        console.error('MongoDB connection failed: ', error.message);
        process.exit(1);
    }
};

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model('todo', todoSchema);

module.exports = {
    connectDB,
    todo
};
