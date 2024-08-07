import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  loginUserController,
  registerUserController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/auth/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/auth/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
// router.post('/auth/refresh', validateBody(), ctrlWrapper());
// router.post('/auth/logOut', validateBody(), ctrlWrapper());

export default router;
