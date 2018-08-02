const express = require('express');
const getToken = require('../../../auth').jwtSign;
const router = express.Router(); // eslint-disable-line new-cap

/**
 * not really login - here we just assign a user object so we can get a token
 * @param req
 * @param res
 * @param next
 */
const login = function(req, res, next) {
  if (!req.body || !req.body.userName || !req.body.password) {
    res.status(400).send('missing information');
  }
  // here we would authenticate using username and password
  // if authenticated, return the user id
  // instead just assign dummy data
  const user = { id: 'ead84679-8d56-41f4-b509-1976072443e9', firstName: 'Ima', lastName: 'Pseudonym'};

  const token =  getToken(user.id);
  res.status(200).send(token).end();
};

router.post('/login', login);

module.exports = router;