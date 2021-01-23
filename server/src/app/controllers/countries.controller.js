const sequelize = require("sequelize");
const { Clear } = require("../models/clear.model.js");

async function getCountriesArray() {
  let query = await Clear.findAll({
    attributes: [
      [
        sequelize.fn("DISTINCT", sequelize.col("destinationCountry")),
        "Country",
      ],
    ],
    where: {
      [sequelize.Op.not]: [{ destinationCountry: "(blank)" }],
    },
  });

  return query.map((countryObj, i) => {
    return { id: i + 1, country: countryObj.dataValues.Country };
  });
}

module.exports = getCountriesArray;
