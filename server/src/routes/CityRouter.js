const express = require("express");
const router = express.Router();
const CityController = require("../controllers/CityController");

router.get("/getAllCity", CityController.getAllCity);

module.exports = router;
