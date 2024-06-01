const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const multer = require("multer");
const path = require('path');
const pool = require("./database.js"); // Ensure this points to your actual database connection file
const { body, validationResult } = require("express-validator");

const app = express();

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images Only!');
      }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single('communityImage');

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: { key: RAWG_API_KEY }
});

app.use(express.json());
app.use(cors());

// Middleware for error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// User registration route
app.post("/adduser", [
    body('user_name').notEmpty(),
    body('user_email').isEmail(),
    body('user_password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { user_name, user_email, user_password, user_displayname } = req.body;
        const hashedPassword = await bcrypt.hash(user_password, 10);
        const query = `INSERT INTO "user" (user_name, user_email, user_password, user_displayname) VALUES ($1, $2, $3, $4) RETURNING *`;
        const result = await pool.query(query, [user_name, user_email, hashedPassword, user_displayname]);
        res.status(201).json({ message: "User added successfully", user: result.rows[0] });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Create community route
app.post('/create-community', (req, res, next) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send({ error: err.message });
        }

        console.log(req.file); // Log the file information
        console.log(req.body); // Log the body information

        try {
            const { communityName, communityDescription, communityUserId } = req.body;
            const communityImage = req.file ? req.file.path : null;

            const result = await pool.query(
                `INSERT INTO community (community_name, community_description, community_user_id, community_image) 
                 VALUES ($1, $2, $3, $4) RETURNING *`,
                [communityName, communityDescription, communityUserId, communityImage]
            );

            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error processing request:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

app.get('/community', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM community');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching communities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User login route
app.post("/login", [
    body('user_name').notEmpty(),
    body('user_password').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { user_name, user_password } = req.body;
        const query = `SELECT * FROM "user" WHERE user_name = $1`;
        const result = await pool.query(query, [user_name]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(user_password, user.user_password);

        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get games route
app.get('/games', async (req, res) => {
    try {
        const result = await pool.query('SELECT game_name, game_genre, game_price FROM games_genre');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Server Error');
    }
});

// Get communities route
app.get('/communities', async (req, res) => {
    try {
        const result = await pool.query('SELECT community_name, community_count FROM community_users');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Server Error');
    }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
