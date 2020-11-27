const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sharp = require('sharp');
const rateLimiter = require('../middleware/rateLimiter');
const router = express.Router();
const User = require('../model/User');
const { secret } = require('../config/keys');
const verifyToken = require('../middleware/verifyToken');

// Register route
router.post('/register', (req, res) => {
    const { email, name, username, password, confirmPassword } = req.body;
    // Check if password doesnt match
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            messsage: 'Password does not match'
        })
    };

    // Check if email available
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is already registered'
                })
            } else {

                // Check if username available
                User.findOne({ username })
                    .then(user => {
                        if (user) {
                            return res.status(400).json({
                                success: false,
                                message: 'Username is already taken'
                            })
                        } else {

                            // User validated, save user
                            bcrypt.genSalt(10)
                                .then(salt => {
                                    bcrypt.hash(password, salt)
                                        .then(hash => {
                                            let newUser = new User({
                                                email,
                                                name,
                                                username,
                                                password: hash
                                            });
                                            newUser.save()
                                                .then(savedUser => {
                                                    return res.status(201).json({
                                                        success: true,
                                                        message: 'User registered successfully'
                                                    });
                                                });
                                        });
                                });
                        }
                    });
            }
        });
});

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
        .then(user => {
            if (user == null) {
                return res.status(404).json({
                    success: false,
                    message: 'Invalid username or password'
                });
            } else {
                bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        let payload = {
                            _id: user._id,
                            email: user.email,
                            name: user.name,
                            username: user.username,
                        }
                        jwt.sign(payload, secret, {
                            expiresIn: 604800
                        }, (err, token) => {
                            // return res.status(200).json({message: 'hello'});
                            return res.status(200).json({
                                success: true,
                                user,
                                token: `Bearer ${token}`,
                                message: 'User logged in successfully'
                                });
                            });
                        } else {
                            return res.status(404).json({
                                success: false,
                                message: 'Invalid username or password'
                            });
                        }
                    }).catch(err => console.log(err));
            }
        });
});

// Get profile route
router.get('/profile', verifyToken, (req, res) => {
    User.findOne({ _id: req.user._id }, (err, result) => {
        if (err) throw err;
        return res.status(200).json({
            success: true,
            user: result
        });
    });
});

// Post profile route
router.post('/profile', verifyToken, multer().single('profilePhoto'), (req, res) => {
    // Resize & convert image
    sharp(req.file.buffer)
        .resize(200, 200)
        .toFormat('png')
        .toBuffer()
        .then(output => {
            User.findOneAndUpdate(
                { _id: req.user._id },
                { profileImage: output, profileImageType: req.file.mimetype },
                (err, doc) => {
                    if (err) throw err;
                    res.status(201).json({
                        success: true,
                        message: 'New user image uploaded'
                    });
                });
        });
});

// Get people route
router.get('/', verifyToken, (req, res) => {
    User.find({
        _id: { $ne: req.user._id }
    }).select('-password').exec((err, result) => {
        if (err) throw err;
        return res.status(200).json({
            success: true,
            value: result,
        });
    });
});

// Get single person route
router.get('/:username', (req, res) => {
    User.findOne({ username: req.params.username }, (err, result) => {
        if (err) throw err;
        return res.status(200).json({
            success: true,
            user: result
        });
    });
});

// Follow person route
router.post('/follows', rateLimiter, verifyToken, (req, res) => {
    User.findOne({
        _id: req.user._id
    }, (err, user) => {
        if (err) throw err;
        if (user.follows.indexOf(req.body.personId) < 0) {
            // If havent follow yet
            user.follows.push(req.body.personId);
            user.save({}, (err) => {
                User.findOne({ _id: req.body.personId }, (err, targetUser) => {
                    if (err) throw err;
                    targetUser.followers.push(req.user._id);
                    targetUser.save({}, (err) => {
                        if (err) throw err;
                        res.status(201).json({
                            success: true,
                            message: 'Successfully follow new person'
                        });
                    });
                });
            });
        } else {
            // If already followed
            user.follows.splice(user.follows.indexOf(req.body.personId), 1);
            user.save({}, (err, result) => {
                if (err) throw err;
                User.findOne({ _id: req.body.personId }, (err, targetUser) => {
                    if (err) throw err;
                    targetUser.followers.splice(user.followers.indexOf(req.user._id), 1);
                    targetUser.save({}, (err) => {
                        if (err) throw err;
                        res.status(200).json({
                            success: true,
                            message: 'Successfully unfollow new person'
                        });
                    });
                });
            });
        }
    });
});

module.exports = router;