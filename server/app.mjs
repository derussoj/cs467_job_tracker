import * as User from './models/User.mjs'
import * as JobApplication from './models/JobApplication.mjs'
import * as Skill from './models/Skill.mjs'
import * as NetworkingContact from './models/NetworkingContact.mjs'

import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import { Strategy as googleStrategy } from 'passport-google-oauth20'
import { Strategy as githubStrategy } from 'passport-github2'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001'
const backendUrl = process.env.BACKEND_URL || 'http://localhost:3000'
const githubClientID = isProduction ? process.env.GITHUB_CLIENT_ID : process.env.GITHUB_CLIENT_ID_DEV
const githubClientSecret = isProduction ? process.env.GITHUB_CLIENT_SECRET : process.env.GITHUB_CLIENT_SECRET_DEV

// MongoDB connection
const mongoDbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jobTracker'
mongoose.connect(mongoDbUri)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err))

// Initialize Express app
const app = express()

/*
Configure the server to add the Access-Control-Allow-Origin header to its
responses. This header tells the browser that it's okay for the React app
to access cross-origin resources.
*/
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:3001'
app.use(cors({
    origin: allowedOrigin,
    credentials: true, // to support credentials like cookies
}))

/*
Middleware
*/
app.use(bodyParser.json())

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use 'true' in production, 'false' in development
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}))

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize())
app.use(passport.session())

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findUserByID(id)
        return done(null, user)
    } catch (err) {
        return done(err)
    }
})

/*
Passport configuration

citation: based on Passport.js documentation
https://www.passportjs.org/packages/passport-google-oauth20/
https://www.passportjs.org/packages/passport-github2/
*/
passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${backendUrl}/auth/google/callback`
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
    clientID: githubClientID,
    clientSecret: githubClientSecret,
    callbackURL: `${backendUrl}/auth/github/callback`
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

/*
Routes
*/
app.get('/', (req, res) => {
    res.send('Welcome to the Job Tracker API')
})

/*
User OAuth routes
*/
app.get('/api/currentUser', (req, res) => {
    if (req.user) {
        // The user is logged in
        // Send back user info
        res.json({
            isLoggedIn: true,
            user: {
                id: req.user._id,
                displayName: req.user.displayName,
                email: req.user.email,
                skills: req.user.skills
            }
        })
    } else {
        // The user is not logged in
        res.json({ isLoggedIn: false })
    }
})

// GitHub OAuth authentication and callback
// citation: https://www.passportjs.org/packages/passport-github2/
app.get('/auth/github',
    passport.authenticate('github', { scope: ['user', 'user:email'] }))
app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: `${frontendUrl}/login` }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect(`${frontendUrl}`)
    })

// Google OAuth authentication and callback
// citation: https://www.passportjs.org/packages/passport-google-oauth20/
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }))
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: `${frontendUrl}/login` }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect(`${frontendUrl}`)
    })

// Logout
app.get('/logout', (req, res) => {
    req.logout()
    res.redirect(`${frontendUrl}`)
})

/*
Other User routes
*/
// Update a user
app.put('/users/:id', (req, res) => {
    User.updateUser(req.params.id, req.body)
        .then(modifiedCount => {
            if (modifiedCount === 0) {
                res.status(404).json({ error: 'User not updated' })
            } else {
                res.status(200).json(modifiedCount)
            }
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({ error: error })
        })
})

// Delete a user
app.delete('/users/:id', (req, res) => {
    User.deleteUser(req.params.id)
        .then(deletedCount => {
            if (deletedCount === 0) {
                res.status(404).json({ error: 'User not deleted' })
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
app.post('/networkingContacts', (req, res) => {
    NetworkingContact.createNetworkingContact(req.body)
        .then(newContact => res.status(201).json(newContact))
        .catch(error => {
            console.error(error)
            res.status(500).json({ error: error })
        })
})

// Find a networking contact using its ID
app.get('/networkingContacts/:id', (req, res) => {
    NetworkingContact.findNetworkingContactByID(req.params.id)
        .then(contact => res.status(200).json(contact))
        .catch(error => {
            console.error(error)
            res.status(500).json({ error: error })
        })
})

// Find all networking contacts for a user
app.get('/networkingContacts/user/:userId', (req, res) => {
    NetworkingContact.findNetworkingContactsForUser(req.params.userId)
        .then(contacts => res.status(200).json(contacts))
        .catch(error => {
            console.error(error)
            res.status(500).json({ error: error })
        })
})

// Update a networking contact
app.put('/networkingContacts/:id', (req, res) => {
    NetworkingContact.updateNetworkingContact(req.params.id, req.body)
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
app.delete('/networkingContacts/:id', (req, res) => {
    NetworkingContact.deleteNetworkingContact(req.params.id)
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

export default app
