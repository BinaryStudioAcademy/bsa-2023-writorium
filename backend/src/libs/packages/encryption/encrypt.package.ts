import { genSalt, hash } from 'bcrypt';

import { type IEncrypt } from '~/libs/packages/encryption/encrypt.js';

class Encrypt implements IEncrypt {
  public async generateSalt(saltRounds: number): Promise<string> {
    return await genSalt(saltRounds);
  }

  public async encrypt(password: string, salt: string): Promise<string> {
    return await hash(password, salt);
  }
}

export { Encrypt };
