import bcrypt from 'bcrypt';

import { type IService } from '~/libs/interfaces/interfaces.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserRepository } from '~/packages/users/user.repository.js';
import { UserDetailsEntity } from '~/packages/users/user-details.entity.js';
import { type UserDetailsRepository } from '~/packages/users/user-details.repository.js';

import {
  type UserGetAllResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';

class UserService implements IService {
  private userRepository: UserRepository;
  private userDetailsRepository: UserDetailsRepository;

  public constructor({
    userRepository,
    userDetailsRepository,
  }: {
    userRepository: UserRepository;
    userDetailsRepository: UserDetailsRepository;
  }) {
    this.userRepository = userRepository;
    this.userDetailsRepository = userDetailsRepository;
  }

  public find(): ReturnType<IService['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): Promise<UserGetAllResponseDto> {
    const items = await this.userRepository.findAll();

    return {
      items: items.map((it) => it.toObject()),
    };
  }

  public async create(
    payload: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(payload.password, salt);

    const user = await this.userRepository.create(
      UserEntity.initializeNew({
        email: payload.email,
        passwordSalt: salt,
        passwordHash: hashedPassword,
      }),
    );

    await this.userDetailsRepository.create(
      UserDetailsEntity.initializeNew({
        lastName: payload.lastName,
        firstName: payload.firstName,
        userId: user.getId() as number,
      }),
    );

    return user.toObject();
  }

  public update(): ReturnType<IService['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IService['delete']> {
    return Promise.resolve(true);
  }
}

export { UserService };
