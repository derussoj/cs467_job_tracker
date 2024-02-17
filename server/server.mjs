import * as User from '/models/User.mjs'
import * as JobApplication from '/models/JobApplication.mjs'
import * as Skill from '/models/Skill.mjs'
import * as NetworkContact from '/models/NetworkContact.mjs'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const googleStrategy = require('passport-google-oauth20').Strategy
const githubStrategy = require('passport-github2').Strategy

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/jobTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err))

/*
Passport configuration

citation: based on Passport.js documentation
https://www.passportjs.org/packages/passport-google-oauth20/
https://www.passportjs.org/packages/passport-github2/
*/
passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback"
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      const user = await User.findOrCreateUserFromGoogle(profile)
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }
))
passport.use(new githubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      const user = await User.findOrCreateUserFromGithub(profile)
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }
))

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(bodyParser.json())

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Job Tracker API');
})

// Google OAuth authentication and callback
// citation: https://www.passportjs.org/packages/passport-google-oauth20/
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }))
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  })

// GitHub OAuth authentication and callback
// citation: https://www.passportjs.org/packages/passport-github2/
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user', 'user:email'] }))
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  })

/*
Job Application routes
*/
// Create a new job application
app.post('/jobApplications', (req, res) => {
  JobApplication.createJobApplication(req.body)
    .then(newApplication => res.status(201).json(newApplication))
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: error })
    })
})

// Find a job application using its ID
app.get('/jobApplications/:id', (req, res) => {
  JobApplication.findJobApplicationByID(req.params.id)
    .then(jobApplication => res.status(200).json(jobApplication))
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: error })
    })
})

// Find all job applications for a user
app.get('/jobApplications/user/:userId', (req, res) => {
  JobApplication.findJobApplicationsForUser(req.params.userId)
    .then(jobApplications => res.status(200).json(jobApplications))
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: error })
    })
})

// Update a job application
app.put('/jobApplications/:id', (req, res) => {
  JobApplication.updateJobApplication(req.params.id, req.body)
    .then(modifiedCount => {
      if (modifiedCount === 0) {
        res.status(404).json({ error: 'JobApplication not updated' })
      } else {
        res.status(200).json(modifiedCount)
      }
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: error })
    })
})

// Delete a job application
app.delete('/jobApplications/:id', (req, res) => {
  JobApplication.deleteJobApplication(req.params.id)
    .then(deletedCount => {
      if (deletedCount === 0) {
        res.status(404).json({ error: 'JobApplication not deleted' })
      } else {
        res.status(204).send()
      }
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: error })
    })
})

/*
Networking Contact routes
*/
// Create a new networking contact
app.post('/networkContacts', (req, res) => {
  NetworkContact.createNetworkingContact(req.body)
    .then(newContact => res.status(201).json(newContact))
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: error })
    })
})

// Find a networking contact using its ID
app.get('/networkContacts/:id', (req, res) => {
  NetworkContact.findNetworkingContactByID(req.params.id)
    .then(contact => res.status(200).json(contact))
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: error })
    })
})

// Find all networking contacts for a user
app.get('/networkContacts/user/:userId', (req, res) => {
  NetworkContact.findNetworkingContactsForUser(req.params.userId)
    .then(contacts => res.status(200).json(contacts))
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: error })
    })
})

// Update a networking contact
app.put('/networkContacts/:id', (req, res) => {
  NetworkContact.updateNetworkingContact(req.params.id, req.body)
    .then(modifiedCount => {
      if (modifiedCount === 0) {
        res.status(404).json({ error: 'NetworkingContact not updated' })
      } else {
        res.status(200).json(modifiedCount)
      }
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: error })
    })
})

// Delete a networking contact
app.delete('/networkContacts/:id', (req, res) => {
  NetworkContact.deleteNetworkingContact(req.params.id)
    .then(deletedCount => {
      if (deletedCount === 0) {
        res.status(404).json({ error: 'NetworkingContact not deleted' })
      } else {
        res.status(204).send()
      }
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: error })
    })
})

/*
Skill routes
*/
// Find all skills for a user
app.get('/skills/:userId', (req, res) => {
  Skill.findSkillsForUser(req.params.userId)
    .then(skills => res.status(200).json(skills))
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: error })
    })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
