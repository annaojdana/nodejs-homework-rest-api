const express = require("express");
const router = express.Router();
const contactController = require("../controller/index");
const authMiddleware = require("../middlewares/jwt");



router.get("/", authMiddleware, contactController.getAll);


router.get("/:contactId", contactController.getOne);

router.post("/", contactController.create);

router.delete("/:contactId", contactController.remove);

router.put("/:contactId", contactController.update);

router.patch("/:contactId/favorite", contactController.patchFavorite);

module.exports = router;
