import { genSalt, hash } from 'bcrypt';

import { type IEncrypt } from './libs/interfaces/interfaces.js';

class Encrypt implements IEncrypt {
  public async generateSalt(saltRounds: number): Promise<string> {
    return await genSalt(saltRounds);
  }

  public async encrypt(password: string, salt: string): Promise<string> {
    return await hash(password, salt);
  }

  public async compare({
    passwordToCompare,
    salt,
    passwordHash,
  }: {
    passwordToCompare: string;
    salt: string;
    passwordHash: string;
  }): Promise<boolean> {
    const hashToCompare = await this.encrypt(passwordToCompare, salt);

    return hashToCompare === passwordHash;
  }
}

export { Encrypt };
