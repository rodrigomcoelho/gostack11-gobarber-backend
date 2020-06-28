import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUser: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCache: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUser = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCache = new FakeCacheProvider();
    createUser = new CreateUserService(fakeUser, fakeHashProvider, fakeCache);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Rodrigo Coelho',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email', async () => {
    await createUser.execute({
      name: 'Rodrigo Coelho',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123',
    });

    await expect(
      createUser.execute({
        name: 'Rodrigo Coelho',
        email: 'rodrigo.coelho@hotmail.com.br',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
