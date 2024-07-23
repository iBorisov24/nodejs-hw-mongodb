import { Contact } from '../models/contacts.js';

export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.error('Something is wrong, pls try later');
    throw error;
  }
};

export const getCurrentContact = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    console.error('Sorry, contact with this id not finded');
    throw error;
  }
};
