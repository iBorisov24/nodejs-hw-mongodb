import { SORT_ORDER } from '../constants/constants.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};
const parseSortBy = (sortBy) => {
  const keysOfContacts = [
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'ContactType',
    'createdAt',
    'updatedAt',
  ];
  if (keysOfContacts.includes(sortBy)) {
    return sortBy;
  }
  return '_id';
};
export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);
  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
