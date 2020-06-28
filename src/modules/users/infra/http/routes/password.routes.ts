import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

import forgotValidator from '../validators/ForgotPasswordValidator';
import resetValidator from '../validators/ResetPasswordValidator';

const passwordsRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordsRouter.post(
  '/forgot',
  forgotValidator,
  forgotPasswordController.create,
);
passwordsRouter.post('/reset', resetValidator, resetPasswordController.create);

export default passwordsRouter;
