import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';
import DayAvailabilityController from '../controllers/DayAvailabilityController';

import {
  monthAvailability,
  dayAvailability,
} from '../validators/ProvidersValidator';

const providersRouter = Router();
const providersController = new ProvidersController();
const monthsController = new MonthAvailabilityController();
const daysController = new DayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:providerId/month-availability',
  monthAvailability,
  monthsController.index,
);
providersRouter.get(
  '/:providerId/day-availability',
  dayAvailability,
  daysController.index,
);

export default providersRouter;
