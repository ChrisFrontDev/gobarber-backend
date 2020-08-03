/* eslint-disable class-methods-use-this */

import { injectable, inject } from 'tsyringe';

// import User from '../infra/typeorm/entities/User';
// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import { differenceInHours, addHours, isAfter } from 'date-fns';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exist');
    }
    const user = await this.usersRepository.findById(userToken?.user_id);

    if (!user) {
      throw new AppError('User  does not exist');
    }

    const tokenCreatedAt = userToken.created_at;

    const dateLimitToExpire = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), dateLimitToExpire)) {
      throw new AppError('link expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
