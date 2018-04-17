'use strict';

// import data JSON file
const data = require('../db/notes');
// import methods to manipulate In-memory-data base
const simDB = require('../db/simDB');
// Initialize the simDB with data
const notes = simDB.initialize(data);

// GET Notes with search
// Find a list of notes that contains the word 'cats'
notes.filter('life', (err, list) => {
  if (err) {
    console.error(err);
  } 
  console.log(list);
});

// GET Notes by ID
// Find a specific note by ID
notes.find(1005, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

// PUT (Update) Notes by ID
const updateObj = {
  title: 'New Title',
  content: 'Blah blah blah'
};

// Update a specific note
notes.update(1005, updateObj, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item); 
  } else {
    console.log('not found');
  }
});