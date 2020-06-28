import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

import indexValidator from '../validators/AppointmentsValidator';

const appointmentsRouter = Router();
const appointmentController = new AppointmentsController();
const providerAppointmentController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', indexValidator, appointmentController.create);
appointmentsRouter.get('/me', providerAppointmentController.index);

export default appointmentsRouter;
