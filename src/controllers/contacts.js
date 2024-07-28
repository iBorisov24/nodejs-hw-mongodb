import { getAllContacts, getCurrentContact } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getServerController = async (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to database',
  });
};

export const getContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getCurrentContact(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
