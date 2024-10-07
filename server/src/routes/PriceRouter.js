const express = require("express");
const router = express.Router();
const PriceController = require("../controllers/PriceController");

router.get("/getAllPrice", PriceController.getAllPrice);

module.exports = router;
