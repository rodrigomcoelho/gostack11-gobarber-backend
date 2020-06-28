import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  providerId: string;
  year: number;
  month: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(dataIn: IRequest): Promise<Appointment[]> {
    const { providerId, year, month, day } = dataIn;

    const cacheKey = `providerAppointments:${providerId}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(
      cacheKey,
    );

    if (appointments) return appointments;

    appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      providerId,
      year,
      month,
      day,
    });

    await this.cacheProvider.save(cacheKey, classToClass(appointments));

    return appointments;
  }
}

export default ListProviderAppointmentsService;
