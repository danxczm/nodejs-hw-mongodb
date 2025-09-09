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
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.ADMIN), AsyncControlWrapper(getAllContactsListController));

router.get(
  '/:contactId',
  isValidId,
  checkRoles(ROLES.ADMIN, ROLES.USER),
  AsyncControlWrapper(getContactByIdController)
);

router.post(
  '/',
  checkRoles(ROLES.ADMIN),
  validateBody(createContactSchema),
  AsyncControlWrapper(createNewContactController)
);

router.patch(
  '/:contactId',
  isValidId,
  checkRoles(ROLES.ADMIN, ROLES.USER),
  validateBody(updateContactSchema),
  AsyncControlWrapper(patchNewContactController)
);

router.delete(
  '/:contactId',
  isValidId,
  checkRoles(ROLES.ADMIN),
  AsyncControlWrapper(deleteContactController)
);

export default router;
