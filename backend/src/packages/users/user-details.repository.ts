import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { UserDetailsEntity } from '~/packages/users/user-details.entity.js';
import { type UserDetailsModel } from '~/packages/users/user-details.model.js';

class UserDetailsRepository implements IRepository {
  private userDetailsModel: typeof UserDetailsModel;

  public constructor(userDetailsModel: typeof UserDetailsModel) {
    this.userDetailsModel = userDetailsModel;
  }

  public find(): ReturnType<IRepository['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): Promise<UserDetailsEntity[]> {
    const users = await this.userDetailsModel.query().execute();

    return users.map((it) => UserDetailsEntity.initialize(it));
  }

  public async create(entity: UserDetailsEntity): Promise<UserDetailsEntity> {
    const { lastName, firstName, userId } = entity.toNewObject();

    const item = await this.userDetailsModel
      .query()
      .insert({
        lastName,
        firstName,
        userId,
      })
      .returning('*')
      .execute();

    return UserDetailsEntity.initialize(item);
  }

  public update(): ReturnType<IRepository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IRepository['delete']> {
    return Promise.resolve(true);
  }
}

export { UserDetailsRepository };
