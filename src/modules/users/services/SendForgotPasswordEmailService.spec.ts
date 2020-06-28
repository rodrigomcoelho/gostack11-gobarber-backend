import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersTokenRepository from '../repositories/fakes/FakeUsersTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUsersTokenRepository;
let sendForgotEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUsersTokenRepository();

    sendForgotEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recovery the password using the email address', async () => {
    await fakeUsersRepository.create({
      name: 'Rodrigo Coelho',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123456',
    });
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await sendForgotEmail.execute({
      email: 'rodrigo.coelho@hotmail.com.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be albe to recover from a non existing email', async () => {
    await expect(
      sendForgotEmail.execute({
        email: 'rodrigo.coelho@hotmail.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Rodrigo',
      email: 'rodrigo.coelho@hotmail.com.br',
      password: '123456',
    });

    await sendForgotEmail.execute({ email: 'rodrigo.coelho@hotmail.com.br' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
