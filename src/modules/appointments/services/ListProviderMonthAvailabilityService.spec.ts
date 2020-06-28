import 'reflect-metadata';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listAvailability: ListProviderMonthAvailabilityService;
let fakeAppointment: FakeAppointmentsRepository;

describe('ListProviderMonthAvailablityService', () => {
  beforeEach(() => {
    fakeAppointment = new FakeAppointmentsRepository();
    listAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointment,
    );
  });

  it('should be able to list month availabilitiy from provider', async () => {
    await fakeAppointment.create({
      provider_id: 'user',
      user_id: 'userId',
      date: new Date(2020, 5, 20, 8, 0, 0),
    });

    await fakeAppointment.create({
      provider_id: 'user',
      user_id: 'userId',
      date: new Date(2020, 5, 20, 9, 0, 0),
    });

    await fakeAppointment.create({
      provider_id: 'user',
      user_id: 'userId',
      date: new Date(2020, 5, 20, 10, 0, 0),
    });

    await fakeAppointment.create({
      provider_id: 'user',
      user_id: 'userId',
      date: new Date(2020, 5, 20, 11, 0, 0),
    });

    await fakeAppointment.create({
      provider_id: 'user',
      user_id: 'userId',
      date: new Date(2020, 5, 20, 12, 0, 0),
    });

    await fakeAppointment.create({
      provider_id: 'user',
      user_id: 'userId',
      date: new Date(2020, 5, 20, 13, 0, 0),
    });

    await fakeAppointment.create({
      provider_id: 'user',
      user_id: 'userId',
      date: new Date(2020, 5, 20, 14, 0, 0),
    });

    await fakeAppointment.create({
      provider_id: 'user',
      user_id: 'userId',
      date: new Date(2020, 5, 20, 15, 0, 0),
    });

    await fakeAppointment.create({
      provider_id: 'user',
      user_id: 'userId',
      date: new Date(2020, 5, 20, 16, 0, 0),
    });

    await fakeAppointment.create({
      provider_id: 'user',
      user_id: 'userId',
      date: new Date(2020, 5, 20, 17, 0, 0),
    });

    await fakeAppointment.create({
      provider_id: 'user',
      user_id: 'userId',
      date: new Date(2020, 5, 21, 8, 0, 0),
    });

    const availabilitiy = await listAvailability.execute({
      providerId: 'user',
      year: 2020,
      month: 6,
    });

    expect(availabilitiy).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
