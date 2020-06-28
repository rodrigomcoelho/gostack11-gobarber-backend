import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUser: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUser = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUser);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUser.create({
      name: 'Rodrigo',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123456',
    });

    const profile = await showProfile.execute({
      userId: user.id,
    });

    expect(profile.name).toBe('Rodrigo');
    expect(profile.email).toBe('rodrigo.coelho@hotmail.com.br');
  });

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        userId: '111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
