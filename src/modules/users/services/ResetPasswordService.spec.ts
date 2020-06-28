import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUsersTokenRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUsersTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rodrigo Coelho',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not reset the password for with non-existing token', async () => {
    await expect(
      resetPassword.execute({ token: '123', password: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not reset the password for with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate('nonuser');
    await expect(
      resetPassword.execute({ token, password: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not reset the password with expired token generated longer than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Rodrigo',
      password: '123456',
      email: 'rodrigo.coelho@hotmail.com.br',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({ token, password: '123456' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
