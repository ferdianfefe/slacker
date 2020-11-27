const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 5000,
    max: 1,
    message: 'You can only commit action once in 10 seconds',
    headers: true
});