import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakerUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;
describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset user password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com.br',
      name: 'Jhon',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toBeCalledWith('123123');

    expect(updatedUser?.password).toBe('123123');
  });

  it('should NOT be able to reset user password with not existent token', async () => {
    await expect(
      resetPasswordService.execute({
        password: '123123',
        token: 'non-existent-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to reset user password with not existent user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existent-user',
    );
    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoul not be able to reset user password after 2h expiration token', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste@teste.com.br',
      name: 'Jhon',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

// HASH
// 2HRS EXPIRAR
// usertoken inexistente
// user inexistente
