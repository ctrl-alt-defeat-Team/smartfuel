var express = require("express");
var router = express.Router();
const User = require('../models/user'); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
require("dotenv").config();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');


passport.use(new LocalStrategy({ usernameField: 'username' },User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(cors());
router.use(bodyParser.json());
router.use(session({ secret: process.env.KEY, resave: false, saveUninitialized: false }));
router.use(passport.initialize());
router.use(passport.session());

const generateToken = (user) => {
    console.log('generating token');
    return jwt.sign({username: user }, process.env.JWT_SECRET, {
      expiresIn: '1h', // tokenul expira dupa 1h
    });
  };
  


 router.post('/', (req, res, next) => {
    console.log('logging in user');
    console.log(req.body);
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Authentication failed', error: err });
      }
      const token = generateToken(req.body.username);
      return res.json({ message: 'Login successful', token });
    })(req, res, next);
  });
  

module.exports = router;
