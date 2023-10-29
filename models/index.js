// models/index.js

const Sequelize = require('sequelize');
const sequelize = require('../config/connection'); // Adjust the path based on your directory structure

const User = require('./user')(sequelize, Sequelize.DataTypes);

const db = {
  sequelize,
  Sequelize,
  User
};

module.exports = db;