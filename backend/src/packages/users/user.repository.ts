import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserModel } from '~/packages/users/user.model.js';

import { UserDetailsModel } from './user-details.model.js';

class UserRepository implements IRepository {
  private userModel: typeof UserModel;
  private defaultRelationExpression = 'userDetails.[avatar]';

  public constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public async find(id: number): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .findById(id)
      .first()
      .withGraphJoined(this.defaultRelationExpression);

    if (!user) {
      return null;
    }

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      avatarId: user.userDetails.avatarId,
      avatarUrl: user.userDetails.avatar?.url ?? null,
    });
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel
      .query()
      .where('email', 'ilike', email)
      .first()
      .withGraphJoined(this.defaultRelationExpression);

    if (!user) {
      return null;
    }

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      avatarId: user.userDetails.avatarId,
      avatarUrl: user.userDetails.avatar?.url ?? null,
    });
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.query().execute();

    return users.map((user) => {
      return UserEntity.initialize({
        id: user.id,
        email: user.email,
        firstName: user.userDetails.firstName,
        lastName: user.userDetails.lastName,
        passwordHash: user.passwordHash,
        passwordSalt: user.passwordSalt,
        avatarId: user.userDetails.avatarId,
        avatarUrl: user.userDetails.avatar?.url ?? null,
      });
    });
  }

  public async create(entity: UserEntity): Promise<UserEntity> {
    const { email, passwordSalt, passwordHash, firstName, lastName } =
      entity.toNewObject();

    const user = await this.userModel
      .query()
      .insertGraphAndFetch({
        email,
        passwordSalt,
        passwordHash,
        userDetails: {
          firstName,
          lastName,
        },
      })
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      avatarId: user.userDetails.avatarId,
      avatarUrl: user.userDetails.avatar?.url ?? null,
    });
  }

  public async update(entity: UserEntity): Promise<UserEntity> {
    const { id, firstName, lastName, email, avatarId } =
      entity.toUpdateObject();
    const user = await this.userModel
      .query()
      .upsertGraphAndFetch({
        id,
        email,
        userDetails: {
          firstName,
          lastName,
          avatarId,
        },
      })
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      avatarId: user.userDetails.avatarId,
      avatarUrl: user.userDetails.avatar?.url ?? null,
    });
  }

  public async updatePassword(entity: UserEntity): Promise<UserEntity> {
    const { id } = entity.toObject();
    const { passwordHash, passwordSalt } = entity.privateData;
    const user = await this.userModel
      .query()
      .patchAndFetchById(id, {
        passwordHash,
        passwordSalt,
      })
      .withGraphFetched(this.defaultRelationExpression)
      .execute();

    return UserEntity.initialize({
      id: user.id,
      email: user.email,
      firstName: user.userDetails.firstName,
      lastName: user.userDetails.lastName,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      avatarId: user.userDetails.avatarId,
      avatarUrl: user.userDetails.avatar?.url ?? null,
    });
  }

  public delete(): ReturnType<IRepository['delete']> {
    return Promise.resolve(true);
  }

  public async getAllAuthors(): Promise<UserDetailsModel[] | null> {
    const authors = await UserDetailsModel.query().distinctOn('userId')
      .whereRaw(`
      EXISTS(SELECT 1
      FROM articles,user_details
      WHERE articles.user_id = user_details.user_id)
    `);

    if (!authors) {
      return null;
    }

    return authors;
  }
}

export { UserRepository };
