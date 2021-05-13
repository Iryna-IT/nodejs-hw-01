const path = require('path');
const fs = require('fs');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;

    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error.message;

    const contacts = JSON.parse(data);
    const foundContact = contacts.find(({ id }) => id === contactId);
    console.log(foundContact);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;

    const contacts = JSON.parse(data);
    const lastContactIndex = contacts.length - 1;
    const id = contacts[lastContactIndex].id + 1;

    if (contacts.find(contact => name === contact.name || contact.email === email || contact.phone === phone)) {
      console.log ('This contact exists');
      return
    }

    contacts.push({ id, name, email, phone })
    fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
      if (error) throw error;

      console.log('The contact is added successfully');
      listContacts();
    }); 

    
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) throw error;

    const contacts = JSON.parse(data);
    const filteredContacts = contacts.filter(({ id }) => id !== contactId);

    if (filteredContacts.length !== contacts.length) {
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts), error => {
        if (error) throw error;

        console.log('The contact is deleted successfully');
        listContacts();
      });
    } else {
      console.log(`The contact with id ${contactId} is not found`);
      listContacts();
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
