import { type IService } from '~/libs/interfaces/interfaces.js';
import { type EncryptConfig } from '~/libs/packages/config/config.js';
import { type IEncrypt } from '~/libs/packages/encryption/encrypt.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserRepository } from '~/packages/users/user.repository.js';

import {
  type UserAuthResponseDto,
  type UserGetAllResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';

class UserService implements IService {
  private userRepository: UserRepository;

  private encrypt: IEncrypt;

  private ENCRYPTION: EncryptConfig;

  public constructor(
    ENCRYPTION: EncryptConfig,
    encrypt: IEncrypt,
    userRepository: UserRepository,
  ) {
    this.userRepository = userRepository;
    this.encrypt = encrypt;
    this.ENCRYPTION = ENCRYPTION;
  }

  public find(): ReturnType<IService['find']> {
    return Promise.resolve(null);
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
  ): Promise<UserSignUpResponseDto> {
    const passwordSalt = await this.encrypt.generateSalt(
      this.ENCRYPTION.USER_PASSWORD_SALT_ROUNDS,
    );
    const passwordHash = await this.encrypt.encrypt(
      payload.password,
      passwordSalt,
    );

    const user = await this.userRepository.create(
      UserEntity.initializeNew({
        email: payload.email,
        passwordSalt,
        passwordHash,
        lastName: payload.lastName,
        firstName: payload.firstName,
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
