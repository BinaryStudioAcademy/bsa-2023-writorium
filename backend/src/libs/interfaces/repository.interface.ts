interface IRepository<T = unknown> {
  find(id: number): Promise<T | null>;
  findAll(filter: unknown): Promise<T[]>;
  create(payload: unknown): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(): Promise<boolean>;
}

export { type IRepository };
