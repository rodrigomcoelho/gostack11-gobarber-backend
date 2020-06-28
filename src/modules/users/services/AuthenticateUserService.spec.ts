import 'reflect-metadata';
import 'dotenv/config';

import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUser: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUser = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(fakeUser, fakeHashProvider);
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUser.create({
      name: 'Rodrigo Coelho',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123',
    });

    const response = await authenticateUser.execute({
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing', async () => {
    await expect(
      authenticateUser.execute({
        email: 'rodrigo.coelho@hotmail.com.br',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a incorrect password', async () => {
    await fakeUser.create({
      name: 'Rodrigo Coelho',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123',
    });

    await expect(
      authenticateUser.execute({
        email: 'rodrigo.coelho@hotmail.com.br',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
