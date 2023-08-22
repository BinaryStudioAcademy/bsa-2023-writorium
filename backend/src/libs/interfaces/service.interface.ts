interface IService<T = unknown> {
  find(): Promise<T>;
  findByEmail(email: string): Promise<T | null>;
  findAll(): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  update(): Promise<T>;
  delete(): Promise<boolean>;
}

export { type IService };
