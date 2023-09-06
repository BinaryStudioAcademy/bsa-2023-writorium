import { ExceptionMessage } from '~/libs/enums/enums.js';
import { ApplicationError } from '~/libs/exceptions/exceptions.js';
import { type IService } from '~/libs/interfaces/interfaces.js';
import { type IConfig } from '~/libs/packages/config/config.js';
import { type IEncrypt } from '~/libs/packages/encrypt/encrypt.js';
import { UserNotFoundError } from '~/libs/packages/exceptions/exceptions.js';
import { type ArticleService } from '~/packages/articles/article.service.js';
import { type AuthResetPasswordDto } from '~/packages/auth/libs/types/types.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserRepository } from '~/packages/users/user.repository.js';

import {
  type UserAuthResponseDto,
  type UserGetAllResponseDto,
  type UserPrivateData,
  type UserSignUpRequestDto,
  type UserUpdateRequestDto,
} from './libs/types/types.js';

type Constructor = {
  config: IConfig;
  encrypt: IEncrypt;
  userRepository: UserRepository;
  articleService: ArticleService;
};

class UserService implements IService {
  private userRepository: UserRepository;

  private encrypt: IEncrypt;

  private config: IConfig;

  private articleService: ArticleService;

  public constructor({
    config,
    encrypt,
    userRepository,
    articleService,
  }: Constructor) {
    this.userRepository = userRepository;
    this.encrypt = encrypt;
    this.config = config;
    this.articleService = articleService;
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

  public async findPrivateData(id: number): Promise<UserPrivateData | null> {
    const user = await this.userRepository.find(id);

    if (!user) {
      return null;
    }

    return user.privateData;
  }

  public async create(
    payload: UserSignUpRequestDto,
  ): Promise<UserAuthResponseDto> {
    const passwordSalt = await this.encrypt.generateSalt(
      this.config.ENCRYPTION.USER_PASSWORD_SALT_ROUNDS,
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

  public async update(
    id: number,
    payload: UserUpdateRequestDto,
  ): Promise<UserAuthResponseDto> {
    const user = await this.findByEmail(payload.email);

    if (user && user.id !== id) {
      throw new ApplicationError({
        message: ExceptionMessage.EMAIL_IS_ALREADY_USED,
      });
    }

    const updatedUser = await this.userRepository.update(
      UserEntity.initialize({
        id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        passwordHash: null,
        passwordSalt: null,
        avatarId: payload.avatarId,
        avatarUrl: null,
      }),
    );

    return updatedUser.toObject();
  }
  public async updatePassword(
    id: number,
    privateDataToSet: AuthResetPasswordDto,
  ): Promise<UserAuthResponseDto> {
    const user = await this.find(id);
    if (!user) {
      throw new UserNotFoundError();
    }

    const passwordSalt = await this.encrypt.generateSalt(
      this.config.ENCRYPTION.USER_PASSWORD_SALT_ROUNDS,
    );

    const passwordHash = await this.encrypt.encrypt(
      privateDataToSet.password,
      passwordSalt,
    );

    const updatedUser = await this.userRepository.updatePassword(
      UserEntity.initialize({
        id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        passwordHash,
        passwordSalt,
        avatarId: null,
        avatarUrl: null,
      }),
    );
    return updatedUser.toObject();
  }

  public delete(): ReturnType<IService['delete']> {
    return Promise.resolve(true);
  }
}

export { UserService };
