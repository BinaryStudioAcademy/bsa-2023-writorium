import { type IService } from '~/libs/interfaces/interfaces.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserRepository } from '~/packages/users/user.repository.js';

import {
  type UserGetAllResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';

class UserService implements IService {
  private userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
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
  ): Promise<Omit<UserSignUpResponseDto, 'accessToken'>> {
    const user = await this.userRepository.create(
      UserEntity.initializeNew({
        email: payload.email,
        /** @todo replace with real implementation */
        passwordSalt: 'SALT',
        passwordHash: 'HASH',
      }),
    );

    return user.toObject();
  }
  public async findById(
    id: number,
  ): Promise<{ id: number; email: string } | null> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return null;
    }

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
