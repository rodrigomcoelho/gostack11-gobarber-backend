import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUser: FakeUsersRepository;
let fakeHash: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUser = new FakeUsersRepository();
    fakeHash = new FakeHashProvider();

    updateProfile = new UpdateProfileService(fakeUser, fakeHash);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUser.create({
      name: 'Rodrigo',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'John Doe',
      email: 'joehdoe@gmail.com',
    });

    expect(updatedUser.name).toBe('John Doe');
    expect(updatedUser.email).toBe('joehdoe@gmail.com');
  });

  it('should not be able modify to an email already used', async () => {
    await fakeUser.create({
      name: 'Rodrigo',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123456',
    });

    const user = await fakeUser.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Doe 2',
        email: 'rodrigo.coelho@hotmail.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUser.create({
      name: 'Rodrigo',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: user.name,
      email: user.email,
      oldPassword: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without oldPassword', async () => {
    const user = await fakeUser.create({
      name: 'Rodrigo',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: user.name,
        email: user.email,
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with incorrect old password', async () => {
    const user = await fakeUser.create({
      name: 'Rodrigo',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: user.name,
        email: user.email,
        oldPassword: 'aaaaaa',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        userId: '111111',
        name: '1111',
        email: 'aaaa',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
