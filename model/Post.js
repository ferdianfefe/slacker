const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post schema
const postSchema = new Schema({
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        required: true,
        default: 'text'
    },
    content: {},
    caption: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Post', postSchema);