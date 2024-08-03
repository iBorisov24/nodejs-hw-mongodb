import { Contact } from '../models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getCurrentContact = async (id) => {
  const contact = await Contact.findById(id);

  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};
export const deleteContact = async (id) => {
  const contact = await Contact.findOneAndDelete(id);
  return contact;
};
export const updateContact = async (id, payload) => {
  const result = await Contact.findByIdAndUpdate(id, payload, { new: true });

  return result;
};
