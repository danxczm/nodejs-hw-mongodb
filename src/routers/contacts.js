import { Router } from 'express';

import { AsyncControlWrapper } from '../utils/AsyncControlWrapper';
import {
  getAllContactsListController,
  getContactByIdController,
  createNewContactController,
} from '../controllers/contacts';

const router = Router();

router.get('/contacts', AsyncControlWrapper(getAllContactsListController));

router.get('/contacts/:contactId', AsyncControlWrapper(getContactByIdController));

router.post('/contacts', AsyncControlWrapper(createNewContactController));

export default router;
