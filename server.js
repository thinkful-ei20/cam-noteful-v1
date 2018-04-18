'use strict';

console.log('Hello Noteful!');

// import express
const express = require('express');
const morgan = require('morgan'); // import morgan logger

// Import data
// Simple In-Memory DataBase
// const data = require('./db/notes'); // Database
// const simDB = require('./db/simDB');  // Database methods
// const notes = simDB.initialize(data);


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


// Starts the server and listens on PORT variable
app.listen(PORT, () => {
  // console.info(`Server listening on ${this.address().port}`);
  console.log('Server is listening on localhost:8080!');
}).on('error', err => {
  console.error(err);
});

