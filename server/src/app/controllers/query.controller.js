const fs = require("fs");
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

// query ...
exports.query = async (country) => {
  const data = sequelize.query(
    `select destinationCountry as Country, cast(year as text) || '-' || cast((month+1) as text) as date,
    SUM(dataUsage) as dataUsage, SUM(dataCharges) as dataCharges,
    SUM(smsUsage) as smsUsage, SUM(smsCharges) as smsCharges,
    SUM(mocUsage) as mocUsage, SUM(mocCharges) as mocCharges,
    SUM(mtcUsage) as mtcUsage, SUM(mtcCharges) as mtcCharges
    from Clears
    where destinationCountry <> '(blank)' AND (:country = '' OR destinationCountry = :country)
    group by destinationCountry, year, month`,
    {
      replacements: { country },
      type: QueryTypes.SELECT,
    }
  );

  return data;
};
