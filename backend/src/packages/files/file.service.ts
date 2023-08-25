import { type FileUploadResponseDto } from 'shared/build/packages/files/files.js';

import { type IService } from '~/libs/interfaces/interfaces.js';
import { type IFileUploadClient } from '~/libs/packages/file/file.package.js';

import { FileEntity } from './file.entity.js';
import { type FileRepository } from './file.repository.js';

class FileService implements IService {
  private fileRepository: FileRepository;
  private fileUploadClient: IFileUploadClient;

  public constructor(
    userRepository: FileRepository,
    fileUploadClient: IFileUploadClient,
  ) {
    this.fileRepository = userRepository;
    this.fileUploadClient = fileUploadClient;
  }

  public async upload(
    fileBuffer: Buffer,
    extension: string,
  ): Promise<FileUploadResponseDto> {
    const uploadedFileUrl = await this.fileUploadClient.upload(
      fileBuffer,
      extension,
    );

    const fileEntity = await this.fileRepository.create(
      FileEntity.initializeNew({ url: uploadedFileUrl }),
    );

    return fileEntity.toObject();
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
