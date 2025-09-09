// src/routers/auth.js

import { Router } from 'express';

import { AsyncControlWrapper } from '../utils/AsyncControlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';
// import { isValidId } from '../middlewares/isValidId.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
} from '../controllers/auth.js';
import { loginUserSchema, registerUserSchema } from '../validations/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  AsyncControlWrapper(registerUserController)
);

router.post('/login', validateBody(loginUserSchema), AsyncControlWrapper(loginUserController));

router.post('/logout', AsyncControlWrapper(logoutUserController));

router.post('/refresh', AsyncControlWrapper(refreshUserSessionController));

export default router;
