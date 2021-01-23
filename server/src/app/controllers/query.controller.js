const fs = require("fs");
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

// query data rows aggregated by country, year and month
exports.query = async (country = "") => {
  const data = sequelize.query(
    `select destinationCountry as Country, cast(year as text) || '-' || cast((month+1) as text) as Period,
    SUM(dataUsage) as 'Data Usage', SUM(dataCharges) as 'Data Charges',
    SUM(smsUsage) as 'SMS Usage', SUM(smsCharges) as 'SMS Charges',
    SUM(mocUsage) as 'MOC Usage', SUM(mocCharges) as 'MOC Charges',
    SUM(mtcUsage) as 'MTC Usage', SUM(mtcCharges) as 'MTC Charges'
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
