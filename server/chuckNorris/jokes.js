'use strict';
/**
 * Require our modules
 */
const jokes = require('express').Router();
const logger = require('../utils/logger');
const request = require('request');

/**
 * Jokes
 */
jokes.options('/');
jokes.get('/:quantity', (req, response, next) => {
  if (req.params.quantity) {
    const endpoint =
      'https://api.icndb.com/jokes/random/' + req.params.quantity;
    request.get(endpoint, function(err, res, body) {
      logger.info('Connected to Chuck Norris API: ' + endpoint);
      if (!err) {
        logger.info('Response received from Chuck Norris API: ' + body);
        body = JSON.parse(body);
        response.status(200).json({
          body
        });
      } else {
        logger.error('Error received from Chuck Norris API: ' + body);
      }
    });
  } else {
    // Didn't sent a quantity
    logger.error('Please provide a quantity of jokes');
    response.status(400).json({
      err: 'Please provide a quantity of jokes'
    });
  }
});

// Export the module
module.exports = jokes;
