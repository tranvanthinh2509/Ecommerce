const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/sign-up", userController.registerUser);
router.post("/sign-in", userController.signInUser);
router.post("/log-out", userController.logOutUser);
router.get("/detail-user/:id", authUserMiddleWare, userController.detailUser);
router.put("/updateUser", authUserMiddleWare, userController.updateUser);
router.post("/refresh-token", userController.refreshToken);
router.post("/sendCodeSMS", userController.sendVerificationCode);

module.exports = router;
