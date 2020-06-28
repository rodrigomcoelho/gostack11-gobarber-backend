import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointment: FakeAppointmentsRepository;
let appointmentsProvider: ListProviderAppointmentsService;
let fakeCache: FakeCacheProvider;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointment = new FakeAppointmentsRepository();
    fakeCache = new FakeCacheProvider();
    appointmentsProvider = new ListProviderAppointmentsService(
      fakeAppointment,
      fakeCache,
    );
  });

  it('should be able to list providers appointments for a day', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 8).getTime();
    });

    const app1 = await fakeAppointment.create({
      provider_id: 'providerId',
      user_id: 'userId',
      date: new Date(2020, 5, 20, 14, 0, 0),
    });

    const app2 = await fakeAppointment.create({
      provider_id: 'providerId',
      user_id: 'userId',
      date: new Date(2020, 5, 20, 15, 0, 0),
    });

    const app3 = await fakeAppointment.create({
      provider_id: 'providerId',
      user_id: 'userId',
      date: new Date(2020, 5, 20, 9, 0, 0),
    });

    const availabilitiy = await appointmentsProvider.execute({
      providerId: 'providerId',
      year: 2020,
      month: 6,
      day: 20,
    });

    expect(availabilitiy).toEqual([app1, app2, app3]);
  });
});
