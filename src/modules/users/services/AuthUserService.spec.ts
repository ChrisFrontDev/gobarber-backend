import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthUserService from './AuthUserService';
import CreateUserService from './CreateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;

describe('AuthUser', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
  });

  it('should be able to Authenticate ', async () => {
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
    const authUser = new AuthUserService(fakeUsersRepository, fakeHashProvider);

    await expect(
      authUser.execute({
        email: 'teste@teste.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to Authenticate with wrong credentials ', async () => {
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

    await expect(
      authUser.execute({
        email: 'teste@teste.com.br',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
