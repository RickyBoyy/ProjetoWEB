// server.js

// Importações e Configurações iniciais
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const path = require("path");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const crypto = require('crypto');
const { User, PasswordReset } = require('./models'); // Import models
const initializePassport = require("./passport-config");
const sendMail = require('./mailer'); // Import the sendMail function

initializePassport(
  passport,
  async email => await User.findOne({ where: { email } }),
  async id => await User.findByPk(id)
);

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Rotas para API

// Login Route
app.post("/api/Login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/Login",
  failureFlash: true
}));

// Register Route
app.post("/api/Register", async (req, res) => {
  try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await User.create({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
      });
      res.redirect("/Login");
  } catch (error) {
      console.error(error);
      res.redirect("/Register");
  }
});

// Password Reset Routes
app.post('/api/forgot-password', async (req, res) => {
  // Lógica para redefinição de senha
});

app.post('/api/reset-password/:token', async (req, res) => {
  // Lógica para redefinição de senha
});

// Frontend Build
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Rota para o frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
