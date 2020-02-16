const express = require('express');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static('public'));
// Properly handle JSON
app.use(express.json());

// Import routers
const baseRouter = require('./routes/base');
const universityRouter = require('./routes/u');
const apiRouter = require('./routes/api');

// Set up paths
app.use('/', baseRouter);
app.use('/u', universityRouter);
app.use('/api', apiRouter);

// Listen
app.listen(port, () => console.log(`App listening on port ${port}!`));
