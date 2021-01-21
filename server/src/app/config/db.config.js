/**
 * Connecting to sqlite db
 */
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
  logging: false,
  timestamps: false,
});

module.exports = sequelize;
