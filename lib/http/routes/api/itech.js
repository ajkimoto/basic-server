const express = require('express');
const async = require('async');

const router = express.Router(); // eslint-disable-line new-cap
const TechLocations = require('../../../tech-locations');
const auth = require('../../../auth');

/**
 * Stub for route to get available techs
 * @param req
 * @param res
 * @param next
 */
const getAvailableTechs = function(req, res, next) {
  // stub for route to get techs
  // here we make the db request
  // possible solution here can utilize spherical trig to get techs within radius of a geo point
  res.status(501).send('NOT_IMPLEMENTED').end();
};

/**
 * update the tech geo-position
 * @param req {object} should have a body with lat and long properties
 * @param res
 * @param next
 */
const updateTechLocation = function(req, res, next) {
  const body = req.body;
  const userId = req.user; //req.user is added from the jwt token in the jwtVerify method in auth.js
  if (!body) {
    return next(new Error('MISSING_INFORMATION')); // pass to error handler
  }
  if (!req.user) {
    return next(new Error('UNAUTHORIZED'));
  }
  const latitude = req.body.lat;
  const longitude = req.body.long;

  if (!latitude || !longitude) {
    return next(new Error('MISSING_INFORMATION'));
  }

  async.waterfall([
    function(cb) {
    return cb(new Error('NOT_FOUND'), null);
      const where = {
        id: { $eq: userId }
      };
      // First we verify that the tech id can be found in the tech-locations table
      // We return the longitude and latitude from the server so we can compare
      // it to the one being passed in the request body
      return TechLocations.findOne({
        where,
        attributes: ['id', 'latitude', 'longitude'],
        raw: true
      })
        .then((results) => {
          if (!results || !results.id) {
            return cb(new Error('NOT_FOUND'), null);
          }
          return cb(null, results);
          })
        .catch(cb);
    },
    function(results, cb) {
      console.log('tech id passed to update is', results.id);
      const where = {
        id: { $eq: results.id }
      };
      // No need to perform update if no change in longitude/latitude
      // Note that we could put some fuzziness here so that small changes would
      // not necessitate an update
      if (latitude === results.latitude && longitude === results.longitude) {
        return cb(null, [0]);
      }
      // Otherwise update the tech-locations record
      TechLocations.update(
        {
          latitude,
          longitude
        },
        {
          where
        })
        .then((results) => {
          if (results[0] === 0) {
            return cb(new Error('UPDATE_FAILED'), null);
          }
          return cb(null, results);
        })
        .catch(cb);
    },
  ], ((err, result) => {
    if (err) {
      console.error('An error occurred: ', err);
      next(err);
    }
    return res.status(200).send('OK').end(); // send OK if everything worked
  }));
};

// All requests are routed through the jwtVerify method that validates
// the token that is expected in the header
router.all('*', auth.jwtVerify);
router.post('/location', updateTechLocation);
router.get('/supply', getAvailableTechs);

module.exports = router;