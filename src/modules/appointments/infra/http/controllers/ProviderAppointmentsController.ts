import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const providerId = req.user.id;
    const { year, month, day } = req.query;

    const service = container.resolve(ListProviderAppointmentsService);

    const appointments = await service.execute({
      providerId,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return res.json(classToClass(appointments));
  }
}

export default ProviderAppointmentsController;
