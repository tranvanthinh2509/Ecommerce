const express = require("express");
const router = express.Router();
const navigateController = require("../controllers/Navigate1Controller.js");
// const navigateController = require("../controllers/NavigateController")

router.get("/getAll", navigateController.navigate);

module.exports = router;
