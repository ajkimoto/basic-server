const jwt = require('jsonwebtoken');
const config = require('../config');


/**
 * Creates a token given a user id. Note that this
 * method is called after we authenticate user
 * @param id
 * @returns {*}
 */
function jwtSign(id) {
  return jwt.sign({ user: { id } }, config.secret);
}

/**
 * Validate the token and attaches the user id ot the req object
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function jwtVerify(req, res, next) {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  return jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.user = decoded.user.id;
    next();
  });
}

module.exports = {
  jwtSign,
  jwtVerify,
};