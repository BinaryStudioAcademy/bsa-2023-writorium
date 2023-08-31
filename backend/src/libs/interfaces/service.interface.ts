interface IService<T = unknown> {
  find(id: number): Promise<T | null>;
  findAll(): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  update(id: unknown, payload: unknown): Promise<T>;
  delete(id: unknown, payload: unknown): Promise<boolean>;
}

export { type IService };
