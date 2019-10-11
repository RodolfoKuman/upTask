const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const db = new Sequelize('uptask', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
  	timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

});

module.exports = db;