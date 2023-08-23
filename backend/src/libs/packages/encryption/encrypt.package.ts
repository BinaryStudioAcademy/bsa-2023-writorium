import bcrypt from 'bcrypt';

class Encrypt {
  public async generateSalt(saltRounds: number): Promise<string> {
    return await bcrypt.genSalt(saltRounds);
  }

  public async encrypt(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}

export { Encrypt };
