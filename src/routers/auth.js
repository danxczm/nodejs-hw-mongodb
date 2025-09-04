// src/routers/auth.js

import { Router } from 'express';

import { AsyncControlWrapper } from '../utils/AsyncControlWrapper.js';

// import {
//   getAllContactsListController,
//   getContactByIdController,
//   createNewContactController,
//   patchNewContactController,
//   deleteContactController,
// } from '../controllers/contacts.js';
// import { createContactSchema, updateContactSchema } from '../validations/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
// import { isValidId } from '../middlewares/isValidId.js';
import { registerUserController } from '../controllers/auth.js';
import { registerUserSchema } from '../validations/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  AsyncControlWrapper(registerUserController)
);

export default router;
