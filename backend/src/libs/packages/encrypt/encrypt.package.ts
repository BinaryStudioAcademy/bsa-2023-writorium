import { compare, genSalt, hash } from 'bcrypt';

import { type IEncrypt } from './libs/interfaces/interfaces.js';

class Encrypt implements IEncrypt {
  public async generateSalt(saltRounds: number): Promise<string> {
    return await genSalt(saltRounds);
  }

  public async encrypt(password: string, salt: string): Promise<string> {
    return await hash(password, salt);
  }

  public async checkPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashPassword);
  }
}

export { Encrypt };
