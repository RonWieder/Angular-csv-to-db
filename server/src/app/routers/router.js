const express = require("express");
const upload = require("../config/multer.config.js");
const csvWorker = require("../controllers/csv.controller.js");
const queryWorker = require("../controllers/query.controller");

const router = express.Router();
/**
 * Route to save csv file\s and callbacks to handle the files
 * 1st callback will save file\s in local directory
 * 2ndcallback will save data o db and will eventually resolve an array of all possible countries in db
 */
router.post("/api/file/upload", upload.array("file"), csvWorker.uploadFiles);

// get call of the aggregated data by country
router.get("/api/query", async function (req, res) {
  let country = req.query.country;
  const rows = await queryWorker.query(country);
  res.json({ rows });
});

module.exports = router;
