// src/services/contacts.js

import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async _ => await ContactsCollection.find();

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
