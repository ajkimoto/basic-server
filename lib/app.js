const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./http/routes');

module.exports = function() {
  // create the server application
  const app = express();

  // middleware
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
  }));
  app.use(bodyParser.json({
    limit: '50mb',
  }));

// routes
  app.use(routes);



// handle our custom errors with appropriate codes
  app.use((err, req, res, next) => {
    //just console.error here but we could pass this to a logging function
    console.error('Error detected:', err);
    if (err.message === 'NOT_FOUND') {
      return res.status(404).send('NOT_FOUND');
    }
    else if (err.message === 'UNAUTHORIZED') {
      return res.status(401).send('UNAUTHORIZED');
    }
    else if (err.message === 'MISSING_INFORMATION') {
      return res.status(400).send('MISSING_INFORMATION');
    } else {
      return res.status(500).send('SERVER_ERROR');
    }
  });

  return app;
};
