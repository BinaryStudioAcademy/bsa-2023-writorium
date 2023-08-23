import { type IService } from '~/libs/interfaces/interfaces.js';

import { type FileRepository } from './file.repository.js';

class FileService implements IService {
  private fileRepository: FileRepository;

  public constructor(userRepository: FileRepository) {
    this.fileRepository = userRepository;
  }

  public find(): ReturnType<IService['find']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<IService['findAll']> {
    return Promise.resolve({ items: [] });
  }

  public create(payload: unknown): ReturnType<IService['create']> {
    return Promise.resolve(payload);
  }

  public update(): ReturnType<IService['create']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IService['delete']> {
    return Promise.resolve(true);
  }
}

export { FileService };
