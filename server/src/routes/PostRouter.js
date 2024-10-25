const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/createPost", authUserMiddleWare, PostController.createPost);
router.put("/updatePost", authUserMiddleWare, PostController.updatePost);
router.delete("/deletePost", authUserMiddleWare, PostController.deletePost);
router.get("/getAllPost", PostController.getAllPost);
router.get("/getLimitPost", PostController.getLimitPost);
router.get("/getNewPost", PostController.getNewPost);
router.get("/getDetailPost", PostController.detailPost);
router.get("/getLimitAdmin", authUserMiddleWare, PostController.getLimitAdmin);

module.exports = router;
