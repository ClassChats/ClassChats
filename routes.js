const express = require('express');
const app = express();
const port = 3000;

// Import routers
const baseRouter = require('./routes/base');
const universityRouter = require('./routes/u');
const apiRouter = require('./routes/api');

// Set up paths
app.use('/', baseRouter);
app.use('/u', universityRouter);
app.use('/api', apiRouter);

// Listen
app.listen(port, () => console.log(`Example app listening on port ${port}!`))