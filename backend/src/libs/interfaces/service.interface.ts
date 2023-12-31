interface IService<T = unknown> {
  find(id: number): Promise<T | null>;
  findAll(filters: unknown): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  update(id: unknown, payload: unknown): Promise<T>;
  delete(id: unknown, payload: unknown): Promise<T>;
}

export { type IService };
