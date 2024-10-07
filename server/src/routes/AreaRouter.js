const express = require("express");
const router = express.Router();
const AreaController = require("../controllers/AreaController");

router.get("/getAllArea", AreaController.getAllArea);

module.exports = router;
