import { type IEntity } from '~/libs/interfaces/interfaces.js';

class UserDetailsEntity implements IEntity {
  private 'id': number | null;

  private 'secondName': string;

  private 'firstName': string;

  private 'userId': number;

  private constructor({
    id,
    secondName,
    firstName,
    userId,
  }: {
    id: number | null;
    secondName: string;
    firstName: string;
    userId: number;
  }) {
    this.id = id;
    this.secondName = secondName;
    this.firstName = firstName;
    this.userId = userId;
  }

  public static initialize({
    id,
    secondName,
    firstName,
    userId,
  }: {
    id: number | null;
    secondName: string;
    firstName: string;
    userId: number;
  }): UserDetailsEntity {
    return new UserDetailsEntity({
      id,
      secondName,
      firstName,
      userId,
    });
  }

  public static initializeNew({
    secondName,
    firstName,
    userId,
  }: {
    secondName: string;
    firstName: string;
    userId: number;
  }): UserDetailsEntity {
    return new UserDetailsEntity({
      id: null,
      secondName,
      firstName,
      userId,
    });
  }

  public toObject(): {
    id: number;
    secondName: string;
    firstName: string;
    userId: number;
  } {
    return {
      id: this.id as number,
      secondName: this.secondName,
      firstName: this.firstName,
      userId: this.userId ,
    };
  }

  public toNewObject(): {
    secondName: string;
    firstName: string;
    userId: number;
  } {
    return {
      secondName: this.secondName,
      firstName: this.firstName,
      userId: this.userId ,
    };
  }
}

export { UserDetailsEntity };
