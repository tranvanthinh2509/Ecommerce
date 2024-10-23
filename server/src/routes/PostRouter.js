const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");

router.post("/createPost", PostController.createPost);
router.put("/updatePost", PostController.updatePost);
router.delete("/deletePost", PostController.deletePost);
router.get("/getAllPost", PostController.getAllPost);
router.get("/getLimitPost", PostController.getLimitPost);
router.get("/getNewPost", PostController.getNewPost);
router.get("/getLimitAdmin", PostController.getLimitAdmin);

module.exports = router;
