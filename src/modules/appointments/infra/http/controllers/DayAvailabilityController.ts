import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class DayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { month, year, day } = req.query;
    const { providerId } = req.params;

    const service = container.resolve(ListProviderDayAvailabilityService);

    const availability = await service.execute({
      providerId,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return res.json(availability);
  }
}

export default DayAvailabilityController;
