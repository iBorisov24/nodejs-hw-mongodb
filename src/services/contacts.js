import { Contact } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();
  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();
  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
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
