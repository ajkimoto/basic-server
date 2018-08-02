const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');
const config = require('../config.json');

// create sequelize object connected to Amazon RDS
// Note that the information is stored in a json file in this example
// but we could also pass this info in as an ENV variable at build time
module.exports = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  logging: console.log,
  maxConcurrentQueries: 100,
  dialect: 'mysql',
  dialectOptions: {
    ssl:'Amazon RDS'
  },
  define: {
    timestamps: false
  },
  pool: { maxConnections: 5, maxIdleTime: 40},
  language: 'en'
});

