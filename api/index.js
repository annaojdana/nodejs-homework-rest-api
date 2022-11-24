const express = require("express");
const router = express.Router();
const contactController = require("../controller/index");

router.get("/contacts", contactController.getAll);

router.get("/contacts/:contactId", contactController.getOne);

router.post("/contacts", contactController.create);

router.delete("/contacts/:contactId", contactController.remove);

router.put("/contacts/:contactId", contactController.update);

router.patch("/contacts/:contactId/favorite", contactController.patchFavorite);

module.exports = router;
