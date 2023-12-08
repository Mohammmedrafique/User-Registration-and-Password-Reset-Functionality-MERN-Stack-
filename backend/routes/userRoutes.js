const express = require("express");
const {
  loginController,
  registerController,
  resetPasswordController,
  forgotPasswordController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// LOGIN (POST)
router.post("/login", loginController);

// REGISTER (POST)
router.post("/register", registerController);

// FORGOT PASSWORD (POST)
router.post("/forgot-password", forgotPasswordController);

// RESET PASSWORD (POST)
router.post("/reset-password/:id/:token", resetPasswordController);

module.exports = router;
