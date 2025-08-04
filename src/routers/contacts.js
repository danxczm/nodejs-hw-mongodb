// src/routers/contacts.js

import { Router } from 'express';

import { AsyncControlWrapper } from '../utils/AsyncControlWrapper.js';

import {
  getAllContactsListController,
  getContactByIdController,
  createNewContactController,
  patchNewContactController,
} from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', AsyncControlWrapper(getAllContactsListController));

router.get('/contacts/:contactId', AsyncControlWrapper(getContactByIdController));

router.post('/contacts', AsyncControlWrapper(createNewContactController));

router.patch('/contacts/:contactId', AsyncControlWrapper(patchNewContactController));

router.delete('/contacts/:contactId', AsyncControlWrapper(patchNewContactController));

export default router;
