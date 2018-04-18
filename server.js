'use strict';
/*global express*/

console.log('Hello Noteful!');


// import express
const express = require('express');

// Import data
// Simple In-Memory DataBase
const data = require('./db/notes'); // Database
const simDB = require('./db/simDB');  // Database methods
const notes = simDB.initialize(data);


// Import the PORT module
const { PORT } = require('./config');
const { logger } = require('./public/middleware/logger.js');
// Init a new express app
const app = express();

// Use the logger module
app.use(logger);
// Tell node to use the express.static built-in middleware
app.use(express.static('public'));
// Parse request body
app.use(express.json());

// Create a GET endpoint which accepts an ID
// NORMAL ROUTES
app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;
  notes.filter(searchTerm, (err, list) => {
    if (list.length === 0 || err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;
  notes.find(id, (err, item) => {
    if (item === undefined || err) { 
      return next(err);
    }
    res.json(item); 
  });
});

// Use the PUT method on the route api/notes/:id, then use the callback function with 3 params, req ,res, and next
app.put('/api/notes/:id', (req, res, next) => {
  // Initialize the ID variable as req.params.id
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  /// Loop over updateFields, and for Each element in the array
  updateFields.forEach(field => {
    // if field is IN(or it's prototype chain) the request body (returns true)
    if (field in req.body) {
      // updateObj[field] is initialized as request.body[field]
      updateObj[field] = req.body[field];
    }
  });

  // update method on notes
  notes.update(id, updateObj, (err, item) => {
    if (Object.keys(updateObj).length === 0 || err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});

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

