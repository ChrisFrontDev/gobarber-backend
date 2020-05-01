/* eslint-disable class-methods-use-this */
import { getRepository } from 'typeorm';

import User from '../models/User';

interface RequestDTO {
  name: string;
  password: string;
  email: string;
}

class CreateUserService {
  public async execute({ email, name, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw Error('Email address already used.');
    }

    const user = usersRepository.create({
      email,
      name,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}
export default CreateUserService;
