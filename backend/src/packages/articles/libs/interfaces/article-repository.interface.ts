import { type IRepository } from '~/libs/interfaces/interfaces.js';

interface IArticleRepository<T = unknown> extends Omit<IRepository, 'findAll'> {
  findAll(filters: unknown): Promise<{ items: T[]; total: number }>;
}

export { type IArticleRepository };
