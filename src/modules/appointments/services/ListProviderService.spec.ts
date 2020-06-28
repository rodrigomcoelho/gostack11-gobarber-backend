import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsers: FakeUsersRepository;
let listProvider: ListProvidersService;
let fakeCache: FakeCacheProvider;

describe('ListProviderService', () => {
  beforeEach(() => {
    fakeUsers = new FakeUsersRepository();
    fakeCache = new FakeCacheProvider();
    listProvider = new ListProvidersService(fakeUsers, fakeCache);
  });

  it('should be able to list all providers', async () => {
    const user1 = await fakeUsers.create({
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      password: '123123',
    });
    const user2 = await fakeUsers.create({
      name: 'John Tres',
      email: 'john.doe2@gmail.com',
      password: '123123',
    });
    const user3 = await fakeUsers.create({
      name: 'John Quatro',
      email: 'john.do4e@gmail.com',
      password: '123123',
    });

    const loggedUser = await fakeUsers.create({
      name: 'Rodrigo Coelho',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123456',
    });

    const providers = await listProvider.execute({ userId: loggedUser.id });

    expect(providers).toStrictEqual([user1, user2, user3]);
  });
});
