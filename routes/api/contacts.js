const express = require("express");
const {
  validationAddContact,
  validationUpdateContact,
} = require("../../utils/validation");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({
    data: { contacts },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    return res.status(200).json({
      data: { contact },
    });
  }

  res.status(404).json({
    message: "Not found",
  });
});

router.post("/", async (req, res, next) => {
  const validationError = validationAddContact(req.body).error;
  if (validationError) {
    return res.status(400).json({
      message: validationError.message,
    });
  }
  const contact = await addContact(req.body);
  res.status(201).json({
    data: { contact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);

  return res.status(204).json({
    message: `You remove this contact ${contact}`,
  });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  const validationError = validationUpdateContact(req.body).error;
  if (!contact) {
    return res.status(404).json({
      message: "Not found",
    });
  }
  if (validationError) {
    return res.status(400).json({
      message: validationError.message,
    });
  }
  const updatedContact = await updateContact(contactId, req.body);

  res.status(200).json({
    data: { updatedContact },
  });
});

module.exports = router;
