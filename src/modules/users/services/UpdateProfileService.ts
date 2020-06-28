import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new AppError('User not found');

    const existingEmail = await this.usersRepository.findByEmail(email);

    if (existingEmail && existingEmail.id !== userId)
      throw new AppError('E-mail already in use');

    if (password && !oldPassword) throw new AppError('oldPassword is required');

    if (oldPassword) {
      const oldPasswordIsValid = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );
      if (!oldPasswordIsValid) throw new AppError('oldPassword does not match');
    }

    user.name = name;
    user.email = email;

    if (password)
      user.password = await this.hashProvider.generateHash(password);

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
