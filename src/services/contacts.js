import { Contact } from '../models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();

  contactsQuery.where('userId').equals(userId);

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

export const getCurrentContact = async ({ id, userId }) => {
  const contact = await Contact.findOne({ _id: userId, id });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};
export const deleteContact = async ({ id, userId }) => {
  const contact = await Contact.findOneAndDelete(id, userId);
  return contact;
};
export const updateContact = async (userId, id, payload) => {
  const result = await Contact.findByIdAndUpdate({ userId, id }, payload, {
    new: true,
  });

  return result;
};
