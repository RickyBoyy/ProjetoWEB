require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const pool = require("./database.js");
const { body, validationResult } = require("express-validator");
const wkx = require('wkx');

const app = express();

app.use(express.json());
app.use(cors());

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: { key: RAWG_API_KEY }
});

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Ensure upload directories exist
const ensureDirExists = (dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Storage configuration for different image types
const storageConfig = (directory) => multer.diskStorage({
    destination: (req, file, cb) => {
        ensureDirExists(directory);
        cb(null, directory);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Images Only!'));
    }
};

const limits = { fileSize: 5 * 1024 * 1024 }; // 5MB limit

const uploadProfileImage = multer({
    storage: storageConfig('uploads/profiles'),
    fileFilter,
    limits
}).single('profilePic');

const uploadPostImage = multer({
    storage: storageConfig('uploads/posts'),
    fileFilter,
    limits
}).single('postImage');

const uploadCommunityImage = multer({
    storage: storageConfig('uploads'),
    fileFilter,
    limits
}).single('communityImage');

const uploadEventImage = multer({
    storage: storageConfig('uploads/events'),
    fileFilter,
    limits
}).single('eventImage');

// Health check route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// User registration route
app.post("/adduser", [
    body('user_name').notEmpty().withMessage('Username is required'),
    body('user_email').isEmail().withMessage('Email is not valid'),
    body('user_password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('user_displayname').notEmpty().withMessage('Display name is required')
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

// Fetch user profile by user_id
app.get('/profile/:user_id', async (req, res) => {
    const userId = req.params.user_id;

    try {
        const result = await pool.query(
            'SELECT user_displayname, profile_pic, user_description FROM "user" WHERE user_id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user profile by user_id
app.put('/profile/:user_id', (req, res) => {
    uploadProfileImage(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const userId = req.params.user_id;
        const { user_displayname, user_description } = req.body;
        const profilePic = req.file ? req.file.path : null;

        try {
            const result = await pool.query(
                `UPDATE "user" 
                 SET user_displayname = $1, user_description = $2, profile_pic = $3 
                 WHERE user_id = $4 
                 RETURNING user_displayname, profile_pic, user_description`,
                [user_displayname, user_description, profilePic, userId]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }

            const updatedProfile = result.rows[0];
            if (updatedProfile.profile_pic) {
                updatedProfile.profile_pic = updatedProfile.profile_pic.replace('uploads/', '');
            }

            res.status(200).json(updatedProfile);
        } catch (error) {
            console.error('Error updating user profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// Create community route
app.post('/create-community', (req, res) => {
    uploadCommunityImage(req, res, async (err) => {
        if (err) {
            return res.status(400).send({ error: err.message });
        }

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

// Fetch community by ID
app.get('/community/:id', async (req, res) => {
    const communityId = req.params.id;

    try {
        const result = await pool.query('SELECT * FROM community WHERE community_id = $1', [communityId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Community not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching community:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create event route
app.post('/create-event', (req, res) => {
    uploadEventImage(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const { title, location, time, description, userId } = req.body;
        const eventImage = req.file ? req.file.path : null;

        try {
            const result = await pool.query(
                `INSERT INTO events (event_name, event_location, event_time, event_description, event_user_id, event_img) 
                 VALUES ($1, ST_GeomFromText($2, 4326), $3, $4, $5, $6) RETURNING event_id`,
                [title, location, time, description, userId, eventImage]
            );

            res.status(201).json({ eventId: result.rows[0].event_id });
        } catch (error) {
            console.error('Error creating event:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// Fetch event by ID
app.get('/event/:id', async (req, res) => {
    const eventId = req.params.id;

    try {
        const result = await pool.query(
            `SELECT event_id, event_name, ST_AsText(event_location) AS event_location, event_time, event_description, event_img 
             FROM events 
             WHERE event_id = $1`,
            [eventId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const event = result.rows[0];
        if (event.event_img) {
            event.event_img = event.event_img.replace('uploads/', '');
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { user_email, user_password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM "user" WHERE user_email = $1', [user_email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(user_password, user.user_password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ user_id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error processing login request:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Post image upload
app.post('/upload-post-image', uploadPostImage, (req, res) => {
    if (req.file) {
        res.status(201).json({ filePath: req.file.path });
    } else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
