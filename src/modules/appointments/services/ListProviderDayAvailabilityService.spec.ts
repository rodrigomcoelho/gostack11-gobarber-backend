import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointment: FakeAppointmentRepository;
let daysAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointment = new FakeAppointmentRepository();
    daysAvailability = new ListProviderDayAvailabilityService(fakeAppointment);
  });

  it('should be able to list the day availabiltiy from provider', async () => {
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

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 20, 11).getTime();
    });

    const availabilitiy = await daysAvailability.execute({
      providerId: 'user',
      year: 2020,
      month: 6,
      day: 20,
    });

    expect(availabilitiy).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
