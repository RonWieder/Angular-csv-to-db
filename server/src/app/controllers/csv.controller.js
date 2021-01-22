const fs = require("fs");
const csv = require("@fast-csv/parse");
const { Clear, clearHeaders } = require("../models/clear.model.js");
const getCountriesArray = require("./countries.controller");

// Handle upload of files
exports.uploadFiles = async (req, res) => {
  const messages = [];
  for (let file of req.files) {
    try {
      // Parsing CSV File to data array objects
      const filePath = __basedir + "/uploads/" + file.filename;
      const readfs = fs.createReadStream(filePath).pipe(csv.parse());

      // Wrapping reading of the file in async function
      const readFile = new Promise(function (resolve, reject) {
        const clearRows = [];

        readfs.on("data", (row) => clearRows.push(rowToObject(row)));
        readfs.on("end", () => {
          removeFile();
          resolve(clearRows);
        });
        readfs.on("error", (error) => {
          removeFile();
          reject(error);
        });
      });

      const removeFile = () => {
        fs.unlink(filePath, (err) => {
          if (err) throw err;
        });
      };

      await (async function () {
        let clearRows = await readFile;

        // save csv filw data to sqlite db
        await Clear.bulkCreate(clearRows).then(() => {
          const message = {
            status: "ok",
            filename: file.originalname,
            message: "Upload Successfully!",
          };
          messages.push(message);
        });
      })();
    } catch (error) {
      const message = {
        status: "fail",
        filename: file.originalname,
        message: "Error -> " + error.message,
      };
      messages.push(message);
    }
  }

  const countriesArray = getCountriesArray();

  const result = {
    status: "ok",
    messages,
    countriesArray,
    message: "Upload Successfully!",
  };
  res.json(result);
};

// Reduce array of strings to Clear object
const rowToObject = (row) => {
  return row.reduce(function (acc, cur, i) {
    acc[clearHeaders[i]] = cur;
    return acc;
  }, {});
};
