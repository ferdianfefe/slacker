const router = require('express').Router();
const Post = require('../model/Post');
const verifyToken = require('../middleware/verifyToken');

// Create post route
router.post('/', verifyToken, (req, res) => {
    const { type, content, caption } = req.body;
    const newPost = new Post({
        creator: req.user._id,
        content,
        caption,
    });

    newPost.save((err, createdPost) => {
        if (err) throw err;
        return res.status(201).json({
            success: true,
            value: createdPost
        });
    });
});

// Get posts route
router.get('/', verifyToken, (req, res) => {
    Post.find()
        .populate('creator')
        .then(posts => {
            res.status(200).json({
                success: true,
                value: posts
            });
        });
});

module.exports = router;