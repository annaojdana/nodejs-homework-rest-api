const { writeFile, readFile } = require("fs").promises;
const { resolve } = require("path");

const contactsPath = resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const list = JSON.parse(await readFile(contactsPath, "utf8"));

    return list;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const list = await listContacts();

    const contactWanted = list.find((c) => Number(c.id) === Number(contactId));

    return contactWanted;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const list = await listContacts();

    const removedContact = list.filter(
      (c) => Number(c.id) === Number(contactId)
    );

    const contactsListWithoutDeleteContact = JSON.stringify(
      list.filter((c) => Number(c.id) !== Number(contactId)),
      null,
      2
    );

    await writeFile(contactsPath, contactsListWithoutDeleteContact);

    return removedContact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  const { email, name, phone } = body;
  try {
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

    const newList = JSON.stringify([...list, newContact], null, 2);

    await writeFile(contactsPath, newList);

    return await listContacts();
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contact = await getContactById(contactId);
    if (contact) {
      const updateContact = {
        ...contact,
        ...body,
      };

      await removeContact(contactId);

      const list = await listContacts();
      const sortedList = [...list, updateContact].sort(
        (a, b) => Number(a.id) - Number(b.id)
      );

      const updateList = JSON.stringify(sortedList, null, 2);
      console.log(updateList);

      await writeFile(contactsPath, updateList);

      return await listContacts();
    }
    return console.log("Nie ma takiego kontaktu");
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
