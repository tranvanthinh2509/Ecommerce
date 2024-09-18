const express = require("express");
const router = express.Router();
const navigateController = require("../controllers/navigateController");

router.get("/getAll", navigateController.navigate);

module.exports = router;
