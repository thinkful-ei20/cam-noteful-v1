'use strict';

// access to express so we can get to the router
const express = require('express');
const router = express.Router();
// shorthand code:
// const router = require('express').Router();

// Database initialization
const data = require('../db/notes'); // Database
const simDB = require('../db/simDB');  // Database methods
const notes = simDB.initialize(data);

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


// REQUESTS =============================================
// ==== GET =================================================
router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm)
    .then(list => {
      if (list) {
        res.json(list);
      } else {
        next();
      }
    }).catch(err => {
      return next(err);
    });
});

router.get('/notes/:id', (req, res, next) => {
  const { id } = req.params;
  // moved the callback to the .then() and err to .catch();
  notes.find(id)
  // Promise to find the item with a matching id
  // upon success run .then
    .then(item => {
      // if item condition is true
      if (item) {
        res.json(item); // return JSON formatted version of item
      } else {
        next(); // else move to the next function
      }
      // If the promise fails(rejects)
    }).catch(err => {
      next(err); // move to next error handler
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

  // Loop over updateFields, and for Each element in the array
  updateFields.forEach(field => {
    // if field is IN(or it's prototype chain) the request body (returns true)
    if (field in req.body) {
      // updateObj[field] is initialized as request.body[field]
      updateObj[field] = req.body[field];
    }
  });

  // ==== UPDATE =================================================
  // update method on notes
  notes.update(id, updateObj)
    .then(item => {
      if (id && updateObj) {
        res.json(item);
      } else {
        next();
      }
    }).catch(err => {
      return next(err);
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

  notes.create(newItem)
    .then(item => {
      if (item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
      } else {
        next();
      }
    }).catch(err => {
      return next(err);
    });

  // notes.create(newItem, (err, item) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   if (item) {
  //     // create process needs to return a 201 status
  //     // Part of the standard guidelines for RESTful api's
  //     // creates a header that has the location of (item)
  //     // passes back to the client so they know where to find it for later reference
  //     res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
  //   } else {
  //     next();
  //   }
  // });
});

// ==== DELETE =================================================
router.delete('/notes/:id', (req, res, next) => {
  const id = req.params.id;
  notes.find(id, (err) => {
    console.log(`find id: ${id}`);
    console.log(`find err: ${err}`);
    if (err !== null) {
      return next(err);
    }

    notes.delete(id, (err, length) => {
      console.log(`err: ${err}, length: ${length}`);
      if (err !== null) {
        return next(err); // goes to error handler
      } else if (length !== 1) {
        return next(err);
      }
      res.sendStatus(204);
      res.status(204).json({ message: 'No Content' }).end();
    });
  });
});


module.exports = router;