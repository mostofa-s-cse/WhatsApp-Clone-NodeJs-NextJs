import express from "express"; // Import the Express framework
import dotenv from "dotenv"; // Import dotenv for environment variables
import cors from "cors"; // Import CORS middleware
import AuthRoutes from "./routes/AuthRoutes.js"; // Import authentication routes

dotenv.config(); // Load environment variables from .env file
const app = express(); // Create an Express application

app.use(cors()); // Enable CORS middleware to allow cross-origin requests
app.use(express.json()); // Parse JSON bodies of incoming requests
app.use("/api/auth", AuthRoutes); // Mount authentication routes at /api/auth

// Start the server and listen for connections
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
