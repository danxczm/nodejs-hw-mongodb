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
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', AsyncControlWrapper(getAllContactsListController));

router.get('/:contactId', isValidId, AsyncControlWrapper(getContactByIdController));

router.post(
  '/',
  validateBody(createContactSchema),
  AsyncControlWrapper(createNewContactController)
);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  AsyncControlWrapper(patchNewContactController)
);

router.delete('/:contactId', isValidId, AsyncControlWrapper(deleteContactController));

export default router;
