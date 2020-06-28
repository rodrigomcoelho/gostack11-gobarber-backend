import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRespository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    date,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now()))
      throw new AppError('You may not create an appointment in the past');

    if (user_id === provider_id)
      throw new AppError('You may not create an appointment to yourself');

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError('Appointments are only allowed between 8h and 17h');

    const findAppointmentInTheSameDate = await this.appointmentRespository.findByDate(
      appointmentDate,
      provider_id,
    );

    if (findAppointmentInTheSameDate)
      throw new AppError('Time is already booked');

    const appointment = await this.appointmentRespository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    const formattedDate = format(appointmentDate, "dd/MM/yyyy' às 'HH'h'mm");

    await this.notificationsRepository.create({
      recipientId: provider_id,
      content: `Novo agendamento para dia ${formattedDate}`,
    });

    const dateCacheKey = format(appointmentDate, 'yyyy-M-dd');
    const cacheKey = `providerAppointments:${provider_id}:${dateCacheKey}`;

    await this.cacheProvider.invalidate(cacheKey);

    return appointment;
  }
}

export default CreateAppointmentService;
