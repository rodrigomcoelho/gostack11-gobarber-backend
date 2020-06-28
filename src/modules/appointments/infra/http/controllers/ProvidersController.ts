import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { classToClass } from 'class-transformer';

class ProvidersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({ userId });

    return res.json(classToClass(providers));
  }
}

export default ProvidersController;
