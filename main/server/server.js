const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt"); // For password hashing
const pool = require("./database");
const jwt = require("jsonwebtoken"); // For generating JWTs
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const RAWG_API_KEY = 'd0ee56e7217a47749aabaee06fcfc3f1';
const RAWG_BASE_URL = 'https://api.rawg.io/api';

const axiosInstance = axios.create({
    baseURL: RAWG_BASE_URL,
    params: {
        key: RAWG_API_KEY
    }
});

// User registration route
app.post("/adduser", async (req, res) => {
    try {
        const { user_name, user_email, user_password, user_displayname } = req.body;

        // Validate input
        if (!user_name || !user_email || !user_password) {
            return res.status(400).json({ error: "Username, email, and password are required" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(user_password, 10);

        // Insert user into database
        const query = `INSERT INTO "user" (user_name, user_email, user_password, user_displayname) VALUES ($1, $2, $3, $4) RETURNING *`;
        const result = await pool.query(query, [user_name, user_email, hashedPassword, user_displayname]);

        res.status(201).json({ message: "User added successfully", user: result.rows[0] });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// User login route
app.post("/login", async (req, res) => {
    try {
        const { user_name, user_password } = req.body;

        // Validate input
        if (!user_name || !user_password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        // Check if user exists
        const query = `SELECT * FROM "user" WHERE user_name = $1`;
        const result = await pool.query(query, [user_name]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const user = result.rows[0];

        // Compare passwords
        const isValidPassword = await bcrypt.compare(user_password, user.user_password);

        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        // Create a token (optional)
        const token = jwt.sign({ userId: user.user_id }, "your_jwt_secret", { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to fetch and store games from RAWG API
app.get("/api/games/fetch", async (req, res) => {
    try {
        const response = await axiosInstance.get('/games', {
            params: {
                page_size: 10
            }
        });
        const games = response.data.results;

        // Store in the database
        const client = await pool.connect();
        try {
            for (const game of games) {
                const detailsResponse = await axiosInstance.get(`/games/${game.id}`);
                const details = detailsResponse.data;

                await client.query(
                    `INSERT INTO games (game_id, game_name, game_description) VALUES ($1, $2, $3)
                     ON CONFLICT (game_id) DO NOTHING`,
                    [details.id, details.name, details.description || 'No description available']
                );
            }
            res.status(200).json({ message: "Games fetched and stored successfully", games });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error fetching games from RAWG API:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Route to get games from database
app.get("/api/games", async (req, res) => {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    try {
        const result = await pool.query(
            'SELECT * FROM games ORDER BY game_id LIMIT $1 OFFSET $2',
            [pageSize, offset]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching games from database:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(4000, () => console.log("Server running on localhost:4000"));
