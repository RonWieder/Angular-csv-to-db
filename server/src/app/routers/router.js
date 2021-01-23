const express = require("express");
const upload = require("../config/multer.config.js");
const csvWorker = require("../controllers/csv.controller.js");
const queryWorker = require("../controllers/query.controller");
const getCountriesArray = require("../controllers/countries.controller");

const router = express.Router();
/**
 * Route to save csv file\s and callbacks to handle the files
 * 1st callback will save file\s in local directory
 * 2ndcallback will save data o db and will eventually resolve an array of all possible countries in db
 */
router.post("/api/file/upload", upload.array("files"), csvWorker.uploadFiles);

// get call of the aggregated data by country
router.get("/api/query", async function (req, res) {
  let country = req.query.country;
  const clearRows = await queryWorker.query(country);
  res.json(clearRows);
});

router.get("/api/countries", async function (req, res) {
  const country = req.params.country;
  const countries = await getCountriesArray();
  res.json(countries);
});

module.exports = router;
