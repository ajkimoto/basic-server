const express = require('express');
const apiRoutes = require('./api');

const router = express.Router(); //eslint-disable-line new-cap

router.use('/api', apiRoutes);
router.get('/', (req, res) => {
  res.status(200).send('Test Server');
});

module.exports = router;