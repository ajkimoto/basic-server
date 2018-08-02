const dbInit = require('./lib/db');
const apiRoutes = require('./lib/http/routes/api');

module.exports = {
  routes: apiRoutes,
  init: dbInit,
};