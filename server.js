'use strict';

console.log('Hello Noteful!');

// import express
const express = require('express');
const morgan = require('morgan'); // import morgan logger

// Import the PORT module
const { PORT } = require('./config');

// Import ROUTER
const notesRouter = require('./router/notes.router.js');

// Init a new express app
const app = express();

// Use the morgan logger module
// pass 'dev' to morgan, as a parameter, to use the predefined format
app.use(morgan('dev'));

// Tell node to use the express.static built-in middleware
app.use(express.static('public'));
// Parse request body
app.use(express.json());

// Mount the router
app.use('/api', notesRouter);


// ERROR HANDLING =============================================
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

// Starts the server and listens on PORT variable
app.listen(PORT, () => {
  // console.info(`Server listening on ${this.address().port}`);
  console.log('Server is listening on localhost:8080!');
}).on('error', err => {
  console.error(err);
});

