/**
 * Connecting to sqlite db
 */
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: `${__basedir}\\db.sqlite`,
  logging: false,
  timestamps: false,
});

module.exports = sequelize;
