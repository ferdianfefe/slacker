const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const users = require('./routes/users');
const posts = require('./routes/posts');

// Initializinf app
const app = express();

// Cors middleware
app.use(cors());

// Bodyparser middleware
app.use(express.json());

// Mongodb connection
const { mongoURI } = require('./config/keys');
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
    if (err) throw err;
    console.log('Database connection established')
});

app.use(express.static(path.join(__dirname, 'public')))

// Set routes
app.use('/users', users);
app.use('/posts', posts);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});