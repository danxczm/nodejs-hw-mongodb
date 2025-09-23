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
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { loginUserSchema, registerUserSchema, requestResetEmailSchema, resetPasswordSchema } from '../validations/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  AsyncControlWrapper(registerUserController)
);

router.post('/login', validateBody(loginUserSchema), AsyncControlWrapper(loginUserController));

router.post('/logout', AsyncControlWrapper(logoutUserController));

router.post('/refresh', AsyncControlWrapper(refreshUserSessionController));

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  AsyncControlWrapper(requestResetEmailController)
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  AsyncControlWrapper(resetPasswordController),
);

export default router;
