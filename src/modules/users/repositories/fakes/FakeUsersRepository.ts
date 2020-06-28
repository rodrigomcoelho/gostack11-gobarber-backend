import IUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(usr => usr.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(usr => usr.email === email);
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), ...userData });
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(usr => usr.id === user.id);
    if (userIndex >= 0) this.users[userIndex] = user;
    return user;
  }

  public async findAllProviders(data: IFindAllProvidersDTO): Promise<User[]> {
    const { exceptUserId } = data;
    let { users } = this;

    if (exceptUserId)
      users = this.users.filter(user => user.id !== exceptUserId);

    return users;
  }
}

export default FakeUsersRepository;
