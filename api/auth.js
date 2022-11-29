const express = require("express");
const router = express.Router();
const userController = require("../controller/auth");
const authMiddleware = require("../middlewares/jwt");

router.post("/signup", userController.register);
router.post("/login", userController.login);
router.get("/logout", authMiddleware, userController.logout);
router.get("/current", authMiddleware, userController.getCurrent);
router.patch("/", authMiddleware, userController.patchSubscription);

module.exports = router;
