import { type IEntity } from '~/libs/interfaces/interfaces.js';

class UserDetailsEntity implements IEntity {
  private 'id': number | null;

  private 'lastName': string;

  private 'firstName': string;

  private 'userId': number;

  private constructor({
    id,
    lastName,
    firstName,
    userId,
  }: {
    id: number | null;
    lastName: string;
    firstName: string;
    userId: number;
  }) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.userId = userId;
  }

  public static initialize({
    id,
    lastName,
    firstName,
    userId,
  }: {
    id: number | null;
    lastName: string;
    firstName: string;
    userId: number;
  }): UserDetailsEntity {
    return new UserDetailsEntity({
      id,
      lastName,
      firstName,
      userId,
    });
  }

  public static initializeNew({
    lastName,
    firstName,
    userId,
  }: {
    lastName: string;
    firstName: string;
    userId: number;
  }): UserDetailsEntity {
    return new UserDetailsEntity({
      id: null,
      lastName,
      firstName,
      userId,
    });
  }

  public toObject(): {
    id: number;
    lastName: string;
    firstName: string;
    userId: number;
  } {
    return {
      id: this.id as number,
      lastName: this.lastName,
      firstName: this.firstName,
      userId: this.userId,
    };
  }

  public toNewObject(): {
    lastName: string;
    firstName: string;
    userId: number;
  } {
    return {
      lastName: this.lastName,
      firstName: this.firstName,
      userId: this.userId,
    };
  }
}

export { UserDetailsEntity };
