// src/controllers/contacts.js
import createHttpError from 'http-errors';

import {
  createNewContact,
  deleteContact,
  getAllContacts,
  getContactById,
  patchContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContactsListController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({ page, perPage, sortBy, sortOrder, filter });

  if (contacts.data.length === 0) {
    res.status(200).json({
      status: 200,
      message: 'The list with such contacts is empty',
      data: contacts,
    });

    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Here is the list of contacts',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

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

export const patchNewContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await patchContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched the contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = deleteContact(contactId);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 204,
    message: 'Successfully deleted the contact!',
  });
};
