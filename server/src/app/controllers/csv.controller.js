const fs = require("fs");
const csv = require("@fast-csv/parse");
const sequelize = require("sequelize");
const { Clear, clearHeaders } = require("../models/clear.model.js");

function rowToObject(row) {
  return row.reduce(function (acc, cur, i) {
    acc[clearHeaders[i]] = cur;
    return acc;
  }, {});
}

// Handle upload of single file
exports.uploadFile = (req, res) => {
  const clearings = [];
  const beginUploadTime = new Date().getTime();
  try {
    fs.createReadStream(__basedir + "/uploads/" + req.file.filename)
      .pipe(csv.parse())
      .on("data", (row) => clearings.push(rowToObject(row)))
      .on("end", () => {
        // Save clearings to db as a bulk
        Clear.bulkCreate(clearings).then(() => {
          console.log(
            "time passed till ending:",
            new Date().getTime() - beginUploadTime,
            "ms"
          );

          // Build the return object which is the list of distinct countries (destinationCountry) in db
          Clear.findAll({
            attributes: [
              [
                sequelize.fn("DISTINCT", sequelize.col("destinationCountry")),
                "Country",
              ],
            ],
            where: {
              [sequelize.Op.not]: [{ destinationCountry: "(blank)" }],
            },
          })
            .then((data) =>
              // Cast array of objects to array of strings
              data.map((countryObj) => countryObj.dataValues.Country)
            )
            .then((data) => {
              const result = {
                status: "ok",
                clears: data,
                message: "Upload Successfully!",
              };

              res.json(result);
            });
        });
      })
      .on("error", (error) => {
        console.error(error);
        throw error.message;
      });
  } catch (error) {
    const result = {
      status: "fail",
      filename: req.file.originalname,
      message: "Upload Error! message = " + error.message,
    };
    res.json(result);
  }
};

exports.uploadFiles = async (req, res) => {
  const messages = [];
  const beginUploadTime = new Date().getTime();
  const files = req.file ? [req.file] : [...req.files];
  console.log(files);
  for (const file of files) {
    console.log("filename:", file.filename);
    const clearings = [];
    try {
      // Parsing CSV Files to data array objects
      fs.createReadStream(__basedir + "/uploads/" + file.filename)
        .pipe(csv.parse())
        .on("data", function (row) {
          clearings.push(rowToObject(row));
        })
        .on("end", function () {
          fs.unlinkSync(file);

          // Save file to sqLite db
          Clear.bulkCreate(clearings)
            .then(function () {
              const message = {
                status: "ok",
                filename: file.originalname,
                message: "Upload Successfully!",
              };
              messages.push(message);
            })
            .catch(function (error) {
              const message = {
                status: "fail",
                body: file.originalname,
                message: "Error -> " + error.message,
              };
              messages.push(message);
            });
        })
        .on("error", function (error) {
          fs.unlinkSync(file);
          throw new Error(error.message);
        });
    } catch (error) {
      console.error("error in parsing file:", error.message);
      fs.unlinkSync(file);
    }
  }
  const queryCountries = async function (resolve, reject) {
    Clear.findAll({
      attributes: [
        [
          sequelize.fn("DISTINCT", sequelize.col("destinationCountry")),
          "Country",
        ],
      ],
      where: {
        [sequelize.Op.not]: [{ destinationCountry: "(blank)" }],
      },
    })
      .then(function (data) {
        // Cast array of objects to array of strings
        data.map((countryObj) => countryObj.dataValues.Country);
      })
      .then(function (data) {
        resolve({
          status: "ok",
          messages,
          clears: data,
          message: "Upload Successfully!",
        });
      })
      .catch(function (error) {
        reject({
          status: "fail",
          messages,
          message: "Upload Error! message = " + error.message,
        });
      });
  };

  const result = await queryCountries;
  res.json(result);
};
