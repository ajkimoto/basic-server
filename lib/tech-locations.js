const Sequelize = require('sequelize');
const DB = require('./db');

// Sequelize schema
const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  latitude: {
    type: Sequelize.DECIMAL(10,7),
    allowNull: false,
  },
  longitude: {
    type: Sequelize.DECIMAL(10,7),
    allowNull: false,
  }
};

// define tech-locations using schema
const TechLocations = DB.define('tech-locations', schema, {
  paranoid: false,
  indexes: [
    {
      fields: ['id'],
      unique: true
    }
  ]
});

module.exports = TechLocations;