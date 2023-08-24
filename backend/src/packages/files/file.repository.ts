import { type IRepository } from '~/libs/interfaces/interfaces.js';

import { FileEntity } from './file.entity.js';
import { type FileModel } from './file.model.js';

class FileRepository implements IRepository {
  private fileModel: typeof FileModel;

  public constructor(fileModel: typeof FileModel) {
    this.fileModel = fileModel;
  }

  public async create(entity: FileEntity): Promise<FileEntity> {
    const { url } = entity.toNewObject();

    const item = await this.fileModel
      .query()
      .insert({
        url,
      })
      .returning('*')
      .execute();

    return FileEntity.initialize(item);
  }

  public find(): ReturnType<IRepository['find']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<IRepository['findAll']> {
    return Promise.resolve([]);
  }

  public update(): ReturnType<IRepository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IRepository['delete']> {
    return Promise.resolve(true);
  }
}

export { FileRepository };
