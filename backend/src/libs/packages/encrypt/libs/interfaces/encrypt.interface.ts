interface IEncrypt {
  generateSalt(saltRounds: number): Promise<string>;
  encrypt(password: string, salt: string): Promise<string>;
  checkPassword(password: string, email: string): Promise<boolean>;
}

export { type IEncrypt };
