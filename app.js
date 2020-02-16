const express = require('express');
const session = require('express-session')

const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));
// Properly handle JSON
app.use(express.json());
// Set up session management
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'best hackathon team',
}));
// Set the view engine
app.set('view engine', 'ejs');

// Import routers
const baseRouter = require('./routes/base');
const universityRouter = require('./routes/u');
const apiRouter = require('./routes/api');

// Ensure session data is available locally
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

// Set up paths
app.use('/', baseRouter);
app.use('/u', universityRouter);
app.use('/api', apiRouter);

// Listen
app.listen(port, () => console.log(`App listening on port ${port}!`));
