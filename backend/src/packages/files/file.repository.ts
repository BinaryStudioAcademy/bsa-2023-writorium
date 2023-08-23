import { type IRepository } from '~/libs/interfaces/interfaces.js';

import { type FileModel } from './file.model.js';

class FileRepository implements IRepository {
  private fileModel: typeof FileModel;

  public constructor(fileModel: typeof FileModel) {
    this.fileModel = fileModel;
  }

  public find(): ReturnType<IRepository['find']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<IRepository['findAll']> {
    return Promise.resolve([]);
  }

  public create(payload: unknown): ReturnType<IRepository['create']> {
    return Promise.resolve(payload);
  }

  public update(): ReturnType<IRepository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IRepository['delete']> {
    return Promise.resolve(true);
  }
}

export { FileRepository };
