import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointment: FakeAppointmentsRepository;
let fakeNotification: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;
let fakeCache: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointment = new FakeAppointmentsRepository();
    fakeNotification = new FakeNotificationsRepository();
    fakeCache = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointment,
      fakeNotification,
      fakeCache,
    );
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 8).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 5, 10, 12),
      provider_id: '11111',
      user_id: '22222',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('11111');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 8).getTime();
    });

    const appointmentDate = new Date(2020, 5, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '11111',
      user_id: '22222',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '11111',
        user_id: '22222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not allow to create an appoinment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 11),
        provider_id: '11111',
        user_id: '22222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not allow to create an appointment with if the user is the provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 8).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 10, 11),
        provider_id: '22222',
        user_id: '22222',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not allow to create an appintment not between 8h and 17', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 8).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 7),
        provider_id: 'providerid',
        user_id: 'userid',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 5, 11, 18),
        provider_id: 'providerid',
        user_id: 'userid',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
