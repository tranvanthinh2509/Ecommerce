const express = require("express");
const router = express.Router();
const insertController = require("../controllers/insertController");

router.post("/", insertController.insert);

module.exports = router;
