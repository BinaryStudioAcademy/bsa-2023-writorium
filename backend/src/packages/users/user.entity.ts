import { type IEntity } from '~/libs/interfaces/interfaces.js';

class UserEntity implements IEntity {
  private 'id': number | null;

  private 'email': string;

  private 'passwordHash': string | null;

  private 'passwordSalt': string | null;

  private 'firstName': string;

  private 'lastName': string;

  private 'avatarId': number | null;

  private 'avatarUrl': string | null;

  private constructor({
    id,
    email,
    passwordHash,
    passwordSalt,
    lastName,
    firstName,
    avatarId,
    avatarUrl,
  }: {
    id: number | null;
    email: string;
    passwordHash: string | null;
    passwordSalt: string | null;
    lastName: string;
    firstName: string;
    avatarId: number | null;
    avatarUrl: string | null;
  }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.passwordSalt = passwordSalt;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatarId = avatarId;
    this.avatarUrl = avatarUrl;
  }

  public static initialize({
    id,
    email,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    avatarId,
    avatarUrl,
  }: {
    id: number;
    email: string;
    passwordHash: string | null;
    passwordSalt: string | null;
    lastName: string;
    firstName: string;
    avatarId: number | null;
    avatarUrl: string | null;
  }): UserEntity {
    return new UserEntity({
      id,
      email,
      passwordHash,
      passwordSalt,
      lastName,
      firstName,
      avatarId,
      avatarUrl,
    });
  }

  public static initializeNew({
    email,
    passwordHash,
    passwordSalt,
    lastName,
    firstName,
  }: {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    lastName: string;
    firstName: string;
  }): UserEntity {
    return new UserEntity({
      id: null,
      email,
      passwordHash,
      passwordSalt,
      firstName,
      lastName,
      avatarId: null,
      avatarUrl: null,
    });
  }

  public toObject(): {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  } {
    return {
      id: this.id as number,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      avatarUrl: this.avatarUrl,
    };
  }

  public toUpdateObject(): {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatarId: number | null;
  } {
    return {
      id: this.id as number,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      avatarId: this.avatarId,
    };
  }

  public toNewObject(): {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    firstName: string;
    lastName: string;
  } {
    return {
      email: this.email,
      passwordHash: this.passwordHash as string,
      passwordSalt: this.passwordSalt as string,
      firstName: this.firstName,
      lastName: this.lastName,
    };
  }

  public get privateData(): {
    passwordHash: string;
    passwordSalt: string;
  } {
    return {
      passwordHash: this.passwordHash as string,
      passwordSalt: this.passwordSalt as string,
    };
  }
}

export { UserEntity };
