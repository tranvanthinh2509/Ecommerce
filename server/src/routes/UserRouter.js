const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

router.post("/sign-up", userController.registerUser);
router.post("/sign-in", userController.signInUser);

module.exports = router;
