'use strict';

const express = require('express');

const router = express.Router();

const data = require('../db/notes'); // Database
const simDB = require('../db/simDB');  // Database methods
const notes = simDB.initialize(data);

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


// REQUESTS =============================================
// ==== GET =================================================
router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;
  notes.filter(searchTerm, (err, list) => {
    if (list.length === 0 || err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

router.get('/notes/:id', (req, res, next) => {
  const { id } = req.params;
  notes.find(id, (err, item) => {
    if (item === undefined || err) { 
      return next(err);
    }
    res.json(item); 
  });
});


// ==== PUT =================================================
// Use the PUT method on the route api/notes/:id, then use the callback function with 3 params, req ,res, and next
router.put('/notes/:id', (req, res, next) => {
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

  // ==== UPDATE =================================================
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

// ==== POST =================================================
router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };

  /***** NEVER TRUST USERS - Validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  });
});


// ==== DELETE =================================================


// ERROR HANDLING =============================================
router.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = router;