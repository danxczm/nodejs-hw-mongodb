// src/controllers/contacts.js
import createHttpError from 'http-errors';

import { createNewContact, getAllContacts, getContactById } from '../services/contacts';

export const getAllContactsListController = async (req, res) => {
  const contacts = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Here are the list of all contacts',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.contactId;
  const contact = getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found!');
  }

  res.json({
    status: 200,
    message: `Successfully found ${contact?.name}'s contact!`,
    data: contact,
  });
};

export const createNewContactController = async (req, res) => {
  const contact = await createNewContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created new contact for ${contact?.name}!`,
    data: contact,
  });
};
