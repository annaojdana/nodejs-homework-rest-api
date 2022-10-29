const { resolve } = require("path");

const { readJsonFile, writeJsonFile } = require("../utils/fileOperations");
const {
  validationAddContact,
  validationUpdateContact,
} = require("../utils/validation");

const { safeJoin } = require("../utils/path");

const contactsPath = safeJoin(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    console.log(contactsPath);
    const list = await readJsonFile(contactsPath);
    return list;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const list = await listContacts();
    console.log(list);
    const contact = list.find((c) => Number(c.id) === Number(contactId));

    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const list = await listContacts();

    const removedContact = getContactById(contactId);

    const listWithoutRemovedContact = list.filter(
      (c) => Number(c.id) !== Number(contactId)
    );

    await writeJsonFile(contactsPath, listWithoutRemovedContact);

    return removedContact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const { email, name, phone } = body;
  try {
    const validationBodyError = validationAddContact(body).error;

    if (validationBodyError) {
      console.log(validationBodyError.message);
      return validationBodyError.message;
    }

    const list = await listContacts();

    const lastId = list.reduce((a, b) => {
      const prevId = Number(a.id);
      const nextId = Number(b.id);
      return prevId > nextId ? prevId : nextId;
    }, 1);

    const newContact = {
      id: String(lastId + 1),
      name,
      email,
      phone: String(phone),
    };

    const newList = [...list, newContact];

    await writeJsonFile(contactsPath, newList);

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contact = await getContactById(contactId);
    const validationBodyError = validationUpdateContact(body).error;

    if (validationBodyError) {
      console.log(validationBodyError.message);
      return "validation";
    }

    if (!contact) {
      console.log("There is no such contact.");
      return "There is no such contact.";
    }

    const updateContact = {
      ...contact,
      ...body,
    };

    await removeContact(contactId);

    const list = await listContacts();
    const sortedList = [...list, updateContact].sort(
      (a, b) => Number(a.id) - Number(b.id)
    );

    await writeJsonFile(contactsPath, sortedList);

    return updateContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
