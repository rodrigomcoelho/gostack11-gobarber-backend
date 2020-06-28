import 'reflect-metadata';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let fakeUser: FakeUsersRepository;
let fakeStorage: FakeStorageProvider;
let updateAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUser = new FakeUsersRepository();
    fakeStorage = new FakeStorageProvider();
    updateAvatar = new UpdateUserAvatarService(fakeUser, fakeStorage);
  });

  it('should be able update user Avatar', async () => {
    const user = await fakeUser.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
    });

    await updateAvatar.execute({
      userId: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update a non-exiting user', async () => {
    await expect(
      updateAvatar.execute({
        userId: '111111',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete avatar when it needed', async () => {
    const deleteFile = jest.spyOn(fakeStorage, 'deleteFile');

    const user = await fakeUser.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234',
    });

    await updateAvatar.execute({
      userId: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateAvatar.execute({
      userId: user.id,
      avatarFileName: 'avatar3.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar3.jpg');
  });
});
