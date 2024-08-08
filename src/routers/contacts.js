import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
  getServerController,
  createContactsController,
  deleteContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
const router = Router();
router.use(authenticate);
router.get('/', getServerController);
router.get('/contacts', ctrlWrapper(getContactsController));
router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactsController),
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(patchContactController),
);

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactsController));

export default router;
