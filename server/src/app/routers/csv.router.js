const express = require("express");
const upload = require("../config/multer.config.js");
const csvWorker = require("../controllers/csv.controller.js");

const router = express.Router();

router.post("/api/file/upload", upload.single("file"), csvWorker.uploadFiles);
router.post(
  "/api/file/multiple/upload",
  upload.array("files"),
  csvWorker.uploadFiles
);

module.exports = router;
