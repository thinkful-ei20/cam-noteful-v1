'use strict';
/*global express*/

console.log('Hello Noteful!');


// import express
const express = require('express');

// Import data
const data = require('./db/notes');

// Import the PORT module
const { PORT } = require('./config');
const { logger } = require('./public/middleware/logger.js');
// Init a new express app
const app = express();
// Tell node to use the express.static built-in middleware
app.use(express.static('public'));
// Use the logger module
app.use(logger);

// Create a GET endpoint which accepts an ID
// NORMAL ROUTES
app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  const filteredData = data.filter(item => item.title.includes(searchTerm));
  res.json(filteredData);
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const item = data[id]; 
  
  data.find(item => item.id === id);
  res.json(item);
});

// app.get('/boom', (req, res, next) => {
//   throw new Error('Boom!!');
// });

// ERROR HANDLING
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

