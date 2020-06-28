import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class MonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { month, year } = req.query;

    const { providerId } = req.params;

    const service = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await service.execute({
      providerId,
      month: Number(month),
      year: Number(year),
    });
    return res.json(availability);
  }
}

export default MonthAvailabilityController;
