// src/routers/contacts.js

import { Router } from 'express';

import { AsyncControlWrapper } from '../utils/AsyncControlWrapper.js';

import {
  getAllContactsListController,
  getContactByIdController,
  createNewContactController,
  patchNewContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { createContactSchema, updateContactSchema } from '../validations/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/contacts', AsyncControlWrapper(getAllContactsListController));

router.get('/contacts/:contactId', isValidId, AsyncControlWrapper(getContactByIdController));

router.post(
  '/contacts',
  validateBody(createContactSchema),
  AsyncControlWrapper(createNewContactController)
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  AsyncControlWrapper(patchNewContactController)
);

router.delete('/contacts/:contactId', AsyncControlWrapper(deleteContactController));

export default router;
