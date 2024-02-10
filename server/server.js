import * as User from '/models/User.mjs'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const githubStrategy = require('passport-github2').Strategy;

/*
citation: Passport.js documentation
https://www.passportjs.org/packages/passport-google-oauth20/
https://www.passportjs.org/packages/passport-github2/
*/
passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreateUserFromGoogle(profile, function (err, user) {
      return cb(err, user);
    });
  }
));
passport.use(new githubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreateUserFromGithub(profile, function (err, user) {
      return cb(err, user);
    });
  }
));

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Job Tracker API');
});

// Google OAuth authentication and callback
// citation: https://www.passportjs.org/packages/passport-google-oauth20/
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// GitHub OAuth authentication and callback
// citation: https://www.passportjs.org/packages/passport-github2/
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user', 'user:email' ] }));
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Connect to MongoDB
mongoose.connect('mongodb://localhost/jobtracker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
