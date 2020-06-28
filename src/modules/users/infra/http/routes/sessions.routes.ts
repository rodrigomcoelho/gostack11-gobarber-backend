import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

import sessionValidator from '../validators/SessionValidator';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionValidator, sessionsController.create);

export default sessionsRouter;
