// src/services/contacts.js

import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();

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

export const getContactById = async id => await ContactsCollection.findById(id);

export const createNewContact = async payload => await ContactsCollection.create(payload);

export const patchContact = async (id, payload, options = {}) => {
  const data = await ContactsCollection.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!data || !data.value) return null;

  return {
    contact: data.value,
    isNew: Boolean(data?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async id => await ContactsCollection.findByIdAndDelete(id);
