const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

const Clear = sequelize.define(
  "Clear",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    homeOperatorCode: DataTypes.STRING,
    visitedOperatorCode: DataTypes.STRING,
    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    destinationCategory: DataTypes.STRING,
    destinationCountry: DataTypes.STRING,
    destinationCountryGroup: DataTypes.STRING,
    dataUsage: DataTypes.INTEGER,
    dataCharges: DataTypes.INTEGER,
    smsUsage: DataTypes.INTEGER,
    smsCharges: DataTypes.INTEGER,
    mocUsage: DataTypes.INTEGER,
    mocCharges: DataTypes.INTEGER,
    mtcUsage: DataTypes.INTEGER,
    mtcCharges: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  }
);

async function createTable() {
  await Clear.sync();
}
createTable();

exports.Clear = Clear;
exports.clearHeaders = [
  "homeOperatorCode",
  "visitedOperatorCode",
  "year",
  "month",
  "destinationCategory",
  "destinationCountry",
  "destinationCountryGroup",
  "dataUsage",
  "dataCharges",
  "smsUsage",
  "smsCharges",
  "mocUsage",
  "mocCharges",
  "mtcUsage",
  "mtcCharges",
];
