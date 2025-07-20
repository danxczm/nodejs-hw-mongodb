import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async _ => await ContactsCollection.find();

export const getContactById = async id => await ContactsCollection.findById(id);
