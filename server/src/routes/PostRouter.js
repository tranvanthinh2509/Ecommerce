const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

router.get("/getAllPost", PostController.getAllPost);
router.get("/getLimitPost", PostController.getLimitPost);

module.exports = router;
