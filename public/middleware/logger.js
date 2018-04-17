'use strict';

// Create an express middleware function which logs all incoming requests
exports.logger = (req, res, next) => {
  const date = new Date();
  console.log(`
    DATE: ${date.toLocaleDateString()} 
    TIME: ${date.toLocaleTimeString()} 
    METHOD: ${req.method} 
    PATH: ${req.path} 
    URL: ${req.url}
  `);
  next();
};

