interface IEncrypt {
  generateSalt(saltRounds: number): Promise<string>;
  encrypt(password: string, salt: string): Promise<string>;
}

export { type IEncrypt };
