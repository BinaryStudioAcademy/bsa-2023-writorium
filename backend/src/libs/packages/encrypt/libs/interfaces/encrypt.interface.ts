interface IEncrypt {
  generateSalt(saltRounds: number): Promise<string>;
  encrypt(password: string, salt: string): Promise<string>;
  compare({
    passwordToCompare,
    salt,
    passwordHash,
  }: {
    passwordToCompare: string;
    salt: string;
    passwordHash: string;
  }): Promise<boolean>;
}

export { type IEncrypt };
