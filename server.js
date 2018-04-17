'use strict';
/*global express*/

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...

// import express
const express = require('express');

// Import data
const data = require('./db/notes');

// Init a new express app
const app = express();
// Tell node to use the express.static built-in middleware
app.use(express.static('public'));

// Create a GET endpoint which accepts an ID
app.get('/api/notes', (req, res) => {
  const searchTerm = req.query.searchTerm;
  console.log(searchTerm);

  const filteredData = data.filter(item => item.title.includes(searchTerm));

  res.json(filteredData);
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const item = data[id]; 
  
  data.find(item => item.id === id);
  res.json(item);
});

// Starts the server and listens on port 8080 for connections
app.listen(8080, () => {
  // console.info(`Server listening on ${this.address().port}`);
  console.log('Server is listening on localhost:8080!');
}).on('error', err => {
  console.error(err);
});

