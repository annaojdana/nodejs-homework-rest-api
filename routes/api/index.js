const express = require("express");
const router = express.Router();
const contactController = require("../controller/index");
const {
  validationAddContact,
  validationUpdateContact,
} = require("../utilities/validation");

router.get("/contacts", contactController.getAll);

router.get("/contacts/:contactId", contactController.getOne);

router.post("/contacts", validationAddContact, contactController.create);

router.delete("/contacts/:contactId", contactController.remove);

router.put(
  "/contacts/:contactId",
  validationUpdateContact,
  contactController.update
);

router.patch(
  "/contacts/:contactId/favorite",
  contactController.patchFavorite
);

module.exports = router;
