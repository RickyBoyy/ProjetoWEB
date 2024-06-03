require('dotenv').config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const multer = require("multer");
const path = require('path');
const pool = require("./database.js");
const { body, validationResult } = require("express-validator");
const wkx = require('wkx');

const app = express();

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));
app.use('/uploads/events', express.static(path.join(__dirname, 'uploads/events')));


// Storage configuration for community images
const communityStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Storage configuration for event images
const eventStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/events'); // Certifique-se que a pasta 'uploads/events/' existe
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/posts');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profiles');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const uploadProfileImage = multer({
    storage: profileStorage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Images Only!'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single('profilePic');


const uploadPostImage = multer({
    storage: postStorage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Images Only!'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single('postImage');


const uploadCommunityImage = multer({
    storage: communityStorage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Images Only!'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single('communityImage');

const uploadEventImage = multer({
    storage: eventStorage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Images Only!'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single('eventImage');


const RAWG_API_KEY = process.env.RAWG_API_KEY;
const JWT_SECRET = process.env.JWT_SECRET;

const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: { key: RAWG_API_KEY }
});

app.use(express.json());
app.use(cors());

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware for error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
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
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

app.post('/create-post', (req, res) => {
    uploadPostImage(req, res, async (err) => {
        if (err) {
            return res.status(400).send({ error: err.message });
        }

        try {
            const { postTitle, postDescription, userId, communityId } = req.body;
            const postImage = req.file ? req.file.path : null;

            const result = await pool.query(
                `INSERT INTO post (post_title, post_url, user_id, community_id) 
                 VALUES ($1, $2, $3, $4) RETURNING *`,
                [postTitle, postImage, userId, communityId]
            );

            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

// Fetch event by ID
// Fetch event by ID
app.get('/events/:id', async (req, res) => {
    const eventId = req.params.id;

    try {
        const result = await pool.query(`
            SELECT event_id, event_name, ST_AsText(event_location) as event_location, event_time, event_description, event_user_id, event_img 
            FROM events 
            WHERE event_id = $1
        `, [eventId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Fetch all events
app.get('/events', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/community', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM community');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch all communities
app.get('/communities', async (req, res) => {
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
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
