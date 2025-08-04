// src/services/contacts.js

import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async _ => await ContactsCollection.find();

export const getContactById = async id => await ContactsCollection.findById(id);

export const createNewContact = async payload => await ContactsCollection.create(payload);

export const patchContact = async (id, payload, options = {}) => {
  const data = await ContactsCollection.findByIdAndUpdate({ _id: id }, payload, options);

  if (!data || !data.result) return null;

  return {
    contact: data.value,
    isNew: Boolean(data?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async id => await ContactsCollection.findByIdAndDelete(id);
