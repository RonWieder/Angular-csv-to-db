const express = require("express");
const upload = require("../config/multer.config.js");
const csvWorker = require("../controllers/csv.controller.js");
const queryController = require("../controllers/query.controller");

const router = express.Router();

router.post("/api/file/upload", upload.single("file"), csvWorker.uploadFile);
router.post(
  "/api/file/multiple/upload",
  upload.array("files"),
  csvWorker.uploadFiles
);

router.get("/api/query", async function (req, res) {
  let country = req.query.country;
  const rows = await queryController.query(country);
  res.json({ rows });
});

module.exports = router;
