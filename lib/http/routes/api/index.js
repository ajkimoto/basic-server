const express = require('express');
const itechRoutes = require('./itech');
const authRoutes = require('./authRoutes');

const router = express.Router(); // eslint-disable-line new-cap

// user the routes
router.use('/itech', itechRoutes);
router.use('/auth', authRoutes);

router.get('/', (req, res) => {
  res.statusCode = 200;
  res.send('Test Server (from api)');
});

module.exports = router;