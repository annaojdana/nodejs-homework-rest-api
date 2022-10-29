const express = require("express");
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
  const contact = await addContact(req.body);
  res.status(201).json({
    data: { contact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);

    if (contact) {
      return res.status(204).json({
        message: "Contact deleted",
      });
    }

    res.status(404).json({
      message: "Not found",
    });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);

  switch (contact) {
    case "not-found":
      res.status(404).json({
        message: "Not found",
      });
      break;

    case "bad-request":
      res.status(400).json({
        message: "Missing fields",
      });
      break;

    default:
      res.status(200).json({
        data: { contact },
      });
      break;
  }
});

module.exports = router;
