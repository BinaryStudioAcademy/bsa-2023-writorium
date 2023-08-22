import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { UserEntity } from '~/packages/users/user.entity.js';
import { type UserModel } from '~/packages/users/user.model.js';
import { type UserDetailsModel } from '~/packages/users/user-details.model.js';

class UserRepository implements IRepository {
  private userModel: typeof UserModel;
  private userDetailsModel: typeof UserDetailsModel;

  public constructor(
    userModel: typeof UserModel,
    userDetailsModel: typeof UserDetailsModel,
  ) {
    this.userModel = userModel;
    this.userDetailsModel = userDetailsModel;
  }

  public find(): ReturnType<IRepository['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.query().execute();

    return users.map((it) => UserEntity.initialize(it));
  }

  public async create(entity: UserEntity): Promise<UserEntity> {
    const { email, passwordSalt, passwordHash, firstName, lastName } =
      entity.toNewObject();

    const item = await this.userModel
      .query()
      .insert({
        email,
        passwordSalt,
        passwordHash,
      })
      .returning('*')
      .execute();

    await this.userDetailsModel.query().insert({
      firstName,
      lastName,
      userId: item.id,
    });

    return UserEntity.initialize({ ...item, firstName, lastName });
  }

  public update(): ReturnType<IRepository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IRepository['delete']> {
    return Promise.resolve(true);
  }
}

export { UserRepository };
