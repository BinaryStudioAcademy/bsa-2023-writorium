import { type IService } from '~/libs/interfaces/interfaces.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserRepository } from '~/packages/users/user.repository.js';

import {
  type UserAuthResponseDto,
  type UserGetAllResponseDto,
  type UserSignUpRequestDto,
} from './libs/types/types.js';

class UserService implements IService {
  private userRepository: UserRepository;

  public constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async find(id: number): Promise<UserAuthResponseDto | null> {
    const user = await this.userRepository.find(id);

    if (!user) {
      return null;
    }

    return user.toObject();
  }

  public async findByEmail(email: string): Promise<UserAuthResponseDto | null> {
    const user = await this.userRepository.findByEmail(email);

    return user ? user.toObject() : null;
  }

  public async findAll(): Promise<UserGetAllResponseDto> {
    const items = await this.userRepository.findAll();

    return {
      items: items.map((it) => it.toObject()),
    };
  }

  public async create(
    payload: UserSignUpRequestDto,
  ): Promise<UserAuthResponseDto> {
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

  public update(): ReturnType<IService['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IService['delete']> {
    return Promise.resolve(true);
  }
}

export { UserService };
