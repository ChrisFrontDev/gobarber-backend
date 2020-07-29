import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthUserService from './AuthUserService';
import CreateUserService from './CreateUserService';

describe('AuthUser', () => {
  it('should be able to Authenticate ', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authUser = new AuthUserService(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({
      email: 'teste@teste.com.br',
      password: '123456',
      name: 'Jhon Doe',
    });

    const response = await authUser.execute({
      email: 'teste@teste.com.br',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });
  it('should not be able to Authenticate whit a non existing user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const authUser = new AuthUserService(fakeUsersRepository, fakeHashProvider);

    expect(
      authUser.execute({
        email: 'teste@teste.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to Authenticate with wrong credentials ', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authUser = new AuthUserService(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({
      email: 'teste@teste.com.br',
      password: '123456',
      name: 'Jhon Doe',
    });

    expect(
      authUser.execute({
        email: 'teste@teste.com.br',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
