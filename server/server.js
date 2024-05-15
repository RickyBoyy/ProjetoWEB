const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000; // Port number

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.get("/api/data", (req, res) => {
  // Here you would handle requests to fetch data from the database
  // Placeholder response for demonstration
  res.json([{ id: 1, name: "Example Data" }]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
